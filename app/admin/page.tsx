'use client';

import { useState, useCallback } from 'react';

/* ── types ── */
interface PImage { src: string; alt: string; before: boolean; }
interface Portfolio {
  id: string; region: string; apartment: string;
  roomType: string; wallpaperType: string; date: string;
  tags: string[]; description: string; images: PImage[];
}

const S = {
  page: { minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f9fafb', padding: 16 } as const,
  card: { background: '#fff', borderRadius: 16, padding: 32, width: '100%', maxWidth: 360, boxShadow: '0 4px 24px rgba(0,0,0,.1)' } as const,
  input: { display: 'block', width: '100%', border: '1px solid #d1d5db', borderRadius: 8, padding: '10px 12px', fontSize: 14, marginBottom: 10, boxSizing: 'border-box' } as const,
  btn: (color = '#cc7009') => ({ display: 'block', width: '100%', background: color, color: '#fff', border: 'none', borderRadius: 8, padding: '11px 0', fontSize: 14, fontWeight: 600, cursor: 'pointer', marginTop: 4 }) as const,
  err: { fontSize: 13, color: '#dc2626', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 8, padding: '8px 12px', marginBottom: 10 } as const,
};

function makeId(region: string, apt: string) {
  return `${region}-${apt}`.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '').replace(/-+/g, '-').slice(0, 60);
}

export default function AdminPage() {
  const [pw, setPw] = useState('');
  const [authed, setAuthed] = useState(false);
  const [loginErr, setLoginErr] = useState('');
  const [busy, setBusy] = useState(false);

  const [list, setList] = useState<Portfolio[]>([]);
  const [savedPw, setSavedPw] = useState('');
  const [toast, setToast] = useState('');
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState<Portfolio | null>(null);

  const blank = (): Portfolio => ({
    id: '', region: '', apartment: '', roomType: '전체',
    wallpaperType: '실크벽지', date: new Date().toISOString().slice(0, 7),
    tags: [], description: '', images: [{ src: '', alt: '', before: false }],
  });
  const [form, setForm] = useState<Portfolio>(blank);
  const [tagsStr, setTagsStr] = useState('');

  function flash(msg: string) { setToast(msg); setTimeout(() => setToast(''), 3000); }

  const reload = useCallback(async (password: string) => {
    const r = await fetch('/api/admin/portfolios', { headers: { 'x-admin-password': password } });
    if (r.ok) setList(await r.json());
  }, []);

  async function doLogin() {
    if (!pw) { setLoginErr('비밀번호를 입력하세요.'); return; }
    setBusy(true); setLoginErr('');
    try {
      const r = await fetch('/api/admin/portfolios', { headers: { 'x-admin-password': pw } });
      if (r.ok) {
        setSavedPw(pw);
        setList(await r.json());
        setAuthed(true);
      } else {
        setLoginErr('비밀번호가 틀렸습니다.');
      }
    } catch {
      setLoginErr('서버 연결 실패. npm run dev 가 실행 중인지 확인하세요.');
    } finally { setBusy(false); }
  }

  function openAdd() { setEditing(null); setForm(blank()); setTagsStr(''); setModal(true); }
  function openEdit(p: Portfolio) { setEditing(p); setForm({ ...p }); setTagsStr(p.tags.join(', ')); setModal(true); }

  async function doDelete(id: string, name: string) {
    if (!confirm(`"${name}" 삭제할까요?`)) return;
    const r = await fetch(`/api/admin/portfolios/${id}`, { method: 'DELETE', headers: { 'x-admin-password': savedPw } });
    if (r.ok) { flash('삭제 완료'); reload(savedPw); } else flash('삭제 실패');
  }

  async function doSave() {
    if (!form.id || !form.region || !form.apartment) { flash('지역, 아파트명, ID 필수'); return; }
    setBusy(true);
    const payload = { ...form, tags: tagsStr.split(',').map(t => t.trim()).filter(Boolean), images: form.images.filter(i => i.src.trim()) };
    const url = editing ? `/api/admin/portfolios/${editing.id}` : '/api/admin/portfolios';
    const method = editing ? 'PUT' : 'POST';
    try {
      const r = await fetch(url, { method, headers: { 'Content-Type': 'application/json', 'x-admin-password': savedPw }, body: JSON.stringify(payload) });
      if (r.ok) { flash(editing ? '수정 완료' : '추가 완료'); setModal(false); reload(savedPw); }
      else { const e = await r.json().catch(() => ({})); flash((e as {error?:string}).error ?? '저장 실패'); }
    } catch { flash('저장 실패'); }
    finally { setBusy(false); }
  }

  const [uploading, setUploading] = useState<Record<number, boolean>>({});

  function setImg(i: number, f: keyof PImage, v: string | boolean) {
    setForm(p => { const imgs = [...p.images]; imgs[i] = { ...imgs[i], [f]: v }; return { ...p, images: imgs }; });
  }

  async function uploadImage(i: number, file: File) {
    if (!form.id) { flash('먼저 지역과 아파트명을 입력하세요.'); return; }
    setUploading(u => ({ ...u, [i]: true }));
    try {
      const fd = new FormData();
      fd.append('file', file);
      fd.append('folder', form.id);
      const r = await fetch('/api/admin/upload', { method: 'POST', headers: { 'x-admin-password': savedPw }, body: fd });
      if (r.ok) {
        const { path } = await r.json();
        setImg(i, 'src', path);
      } else {
        const e = await r.json().catch(() => ({}));
        flash((e as { error?: string }).error ?? '업로드 실패');
      }
    } catch { flash('업로드 실패'); }
    finally { setUploading(u => ({ ...u, [i]: false })); }
  }

  /* ── 로그인 ── */
  if (!authed) return (
    <div style={S.page}>
      <div style={S.card}>
        <h1 style={{ fontSize: 20, fontWeight: 700, marginBottom: 4 }}>어드민 로그인</h1>
        <p style={{ fontSize: 13, color: '#9ca3af', marginBottom: 20 }}>도배에진심이반장 관리자 전용</p>
        <input
          type="password"
          placeholder="비밀번호"
          value={pw}
          onChange={e => setPw(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && doLogin()}
          style={S.input}
          autoFocus
        />
        {loginErr && <p style={S.err}>{loginErr}</p>}
        <button onClick={doLogin} disabled={busy} style={S.btn(busy ? '#9ca3af' : '#cc7009')}>
          {busy ? '확인 중...' : '로그인'}
        </button>
      </div>
    </div>
  );

  /* ── 대시보드 ── */
  return (
    <div style={{ minHeight: '100vh', background: '#f9fafb' }}>
      {/* 헤더 */}
      <div style={{ background: '#fff', borderBottom: '1px solid #e5e7eb', padding: '14px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <b style={{ fontSize: 16 }}>포트폴리오 관리</b>
          <span style={{ fontSize: 12, color: '#9ca3af', marginLeft: 8 }}>도배에진심이반장 어드민</span>
        </div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <button onClick={openAdd} style={{ background: '#cc7009', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 16px', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
            + 새 시공 추가
          </button>
          <button onClick={() => { setAuthed(false); setSavedPw(''); setPw(''); }} style={{ background: 'none', border: 'none', color: '#9ca3af', cursor: 'pointer', fontSize: 13 }}>
            로그아웃
          </button>
        </div>
      </div>

      {/* 목록 */}
      <div style={{ maxWidth: 900, margin: '0 auto', padding: 24 }}>
        {list.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 0', color: '#9ca3af' }}>
            <p style={{ marginBottom: 16 }}>등록된 포트폴리오가 없습니다.</p>
            <button onClick={openAdd} style={S.btn()}>첫 시공 등록하기</button>
          </div>
        ) : list.map(p => (
          <div key={p.id} style={{ background: '#fff', borderRadius: 12, border: '1px solid #f3f4f6', padding: '16px 20px', marginBottom: 10, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
            <div style={{ minWidth: 0 }}>
              <p style={{ fontWeight: 600, fontSize: 15, marginBottom: 2 }}>{p.region} {p.apartment}</p>
              <p style={{ fontSize: 13, color: '#9ca3af' }}>{p.roomType} · {p.wallpaperType} · {p.date} · {p.images.length}장</p>
              <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: 4, marginTop: 6 }}>
                {p.tags.map(t => <span key={t} style={{ fontSize: 11, background: '#fef9f0', color: '#a8550b', padding: '2px 8px', borderRadius: 99 }}>{t}</span>)}
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
              <button onClick={() => openEdit(p)} style={{ fontSize: 13, padding: '6px 12px', border: '1px solid #d1d5db', borderRadius: 8, background: '#fff', cursor: 'pointer' }}>수정</button>
              <button onClick={() => doDelete(p.id, `${p.region} ${p.apartment}`)} style={{ fontSize: 13, padding: '6px 12px', border: '1px solid #fecaca', borderRadius: 8, background: '#fff', color: '#dc2626', cursor: 'pointer' }}>삭제</button>
            </div>
          </div>
        ))}
      </div>

      {/* 토스트 */}
      {toast && (
        <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', background: '#111827', color: '#fff', borderRadius: 99, padding: '10px 20px', fontSize: 14, zIndex: 100 }}>
          {toast}
        </div>
      )}

      {/* 모달 */}
      {modal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.4)', zIndex: 50, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '32px 16px', overflowY: 'auto' }}
          onClick={e => { if (e.target === e.currentTarget) setModal(false); }}>
          <div style={{ background: '#fff', borderRadius: 16, width: '100%', maxWidth: 640, boxShadow: '0 8px 40px rgba(0,0,0,.15)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 24px', borderBottom: '1px solid #f3f4f6' }}>
              <b style={{ fontSize: 16 }}>{editing ? '포트폴리오 수정' : '새 시공 추가'}</b>
              <button onClick={() => setModal(false)} style={{ background: 'none', border: 'none', fontSize: 22, cursor: 'pointer', color: '#6b7280', lineHeight: 1 }}>×</button>
            </div>

            <div style={{ padding: 24, display: 'flex', flexDirection: 'column' as const, gap: 14 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <label style={{ display: 'block' }}>
                  <span style={{ fontSize: 12, color: '#6b7280', display: 'block', marginBottom: 4 }}>시공 지역 *</span>
                  <input style={S.input} placeholder="예) 강남구" value={form.region}
                    onChange={e => { const v = e.target.value; setForm(p => ({ ...p, region: v, id: editing ? p.id : makeId(v, p.apartment) })); }} />
                </label>
                <label style={{ display: 'block' }}>
                  <span style={{ fontSize: 12, color: '#6b7280', display: 'block', marginBottom: 4 }}>아파트/건물명 *</span>
                  <input style={S.input} placeholder="예) 래미안대치팰리스" value={form.apartment}
                    onChange={e => { const v = e.target.value; setForm(p => ({ ...p, apartment: v, id: editing ? p.id : makeId(p.region, v) })); }} />
                </label>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <label style={{ display: 'block' }}>
                  <span style={{ fontSize: 12, color: '#6b7280', display: 'block', marginBottom: 4 }}>공간 유형</span>
                  <input style={S.input} placeholder="전체, 거실·주방, 안방" value={form.roomType}
                    onChange={e => setForm(p => ({ ...p, roomType: e.target.value }))} />
                </label>
                <label style={{ display: 'block' }}>
                  <span style={{ fontSize: 12, color: '#6b7280', display: 'block', marginBottom: 4 }}>벽지 종류</span>
                  <input style={S.input} placeholder="실크벽지, 합지" value={form.wallpaperType}
                    onChange={e => setForm(p => ({ ...p, wallpaperType: e.target.value }))} />
                </label>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <label style={{ display: 'block' }}>
                  <span style={{ fontSize: 12, color: '#6b7280', display: 'block', marginBottom: 4 }}>시공 일자</span>
                  <input type="month" style={S.input} value={form.date}
                    onChange={e => setForm(p => ({ ...p, date: e.target.value }))} />
                </label>
                <label style={{ display: 'block' }}>
                  <span style={{ fontSize: 12, color: '#6b7280', display: 'block', marginBottom: 4 }}>ID (URL) *</span>
                  <input style={{ ...S.input, fontFamily: 'monospace', fontSize: 12 }} value={form.id} disabled={!!editing}
                    onChange={e => setForm(p => ({ ...p, id: e.target.value }))} />
                </label>
              </div>
              <label style={{ display: 'block' }}>
                <span style={{ fontSize: 12, color: '#6b7280', display: 'block', marginBottom: 4 }}>태그 (쉼표 구분)</span>
                <input style={S.input} placeholder="실크벽지, 아파트, 강남구, 전체도배" value={tagsStr}
                  onChange={e => setTagsStr(e.target.value)} />
              </label>
              <label style={{ display: 'block' }}>
                <span style={{ fontSize: 12, color: '#6b7280', display: 'block', marginBottom: 4 }}>시공 설명</span>
                <textarea style={{ ...S.input, height: 72, resize: 'vertical' as const }} placeholder="시공 내용 요약..."
                  value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} />
              </label>

              {/* 이미지 */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ fontSize: 12, color: '#6b7280', fontWeight: 600 }}>이미지</span>
                  <button type="button"
                    onClick={() => setForm(p => ({ ...p, images: [...p.images, { src: '', alt: '', before: false }] }))}
                    style={{ fontSize: 12, color: '#cc7009', background: 'none', border: 'none', cursor: 'pointer' }}>
                    + 이미지 추가
                  </button>
                </div>
                {!form.id && (
                  <p style={{ fontSize: 12, color: '#f59e0b', background: '#fffbeb', border: '1px solid #fde68a', borderRadius: 8, padding: '8px 12px', marginBottom: 8 }}>
                    이미지 업로드 전에 지역·아파트명을 먼저 입력하세요.
                  </p>
                )}
                {form.images.map((img, i) => (
                  <div key={i} style={{ background: '#f9fafb', borderRadius: 8, padding: 12, marginBottom: 8 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                      <span style={{ fontSize: 12, color: '#6b7280' }}>이미지 {i + 1}</span>
                      {form.images.length > 1 && (
                        <button onClick={() => setForm(p => ({ ...p, images: p.images.filter((_, j) => j !== i) }))}
                          style={{ fontSize: 12, color: '#dc2626', background: 'none', border: 'none', cursor: 'pointer' }}>제거</button>
                      )}
                    </div>

                    {/* 이미지 미리보기 + 업로드 버튼 */}
                    <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 8 }}>
                      {/* 미리보기 */}
                      <div style={{ width: 100, height: 80, borderRadius: 6, border: '1px solid #e5e7eb', overflow: 'hidden', flexShrink: 0, background: '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {img.src ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={img.src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        ) : (
                          <span style={{ fontSize: 22, color: '#d1d5db' }}>🖼</span>
                        )}
                      </div>

                      {/* 업로드 버튼 */}
                      <div style={{ flex: 1 }}>
                        <label style={{ display: 'block', cursor: 'pointer' }}>
                          <div style={{
                            border: '2px dashed #d1d5db', borderRadius: 8, padding: '14px 12px',
                            textAlign: 'center', cursor: 'pointer', fontSize: 13, color: '#6b7280',
                            background: uploading[i] ? '#f9fafb' : '#fff',
                          }}>
                            {uploading[i] ? '업로드 중...' : img.src ? '📷 다른 이미지로 교체' : '📷 이미지 선택'}
                            <br />
                            <span style={{ fontSize: 11, color: '#9ca3af' }}>jpg, png, webp, gif</span>
                          </div>
                          <input
                            type="file"
                            accept="image/*"
                            style={{ display: 'none' }}
                            disabled={!form.id || uploading[i]}
                            onChange={e => {
                              const file = e.target.files?.[0];
                              if (file) uploadImage(i, file);
                              e.target.value = '';
                            }}
                          />
                        </label>
                      </div>
                    </div>

                    {/* alt 텍스트 */}
                    <input style={{ ...S.input, marginBottom: 8 }}
                      placeholder="설명: 강남구 래미안대치팰리스 거실 도배 후 — 실크벽지"
                      value={img.alt}
                      onChange={e => setImg(i, 'alt', e.target.value)} />

                    {/* 시공 전/후 */}
                    <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, cursor: 'pointer' }}>
                      <input type="checkbox" checked={img.before} onChange={e => setImg(i, 'before', e.target.checked)} />
                      시공 전(Before) 사진
                    </label>
                  </div>
                ))}
              </div>

              {/* 버튼 */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, borderTop: '1px solid #f3f4f6', paddingTop: 16 }}>
                <button onClick={() => setModal(false)} style={{ fontSize: 13, padding: '8px 16px', border: '1px solid #d1d5db', borderRadius: 8, background: '#fff', cursor: 'pointer' }}>취소</button>
                <button onClick={doSave} disabled={busy} style={{ ...S.btn(busy ? '#9ca3af' : '#cc7009'), width: 'auto', padding: '8px 20px', marginTop: 0 }}>
                  {busy ? '저장 중...' : editing ? '수정 저장' : '추가 저장'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
