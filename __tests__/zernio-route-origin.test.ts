import { afterEach, describe, expect, it, vi } from 'vitest';

vi.mock('@/lib/workspace-access', () => ({
  getCurrentWorkspaceContext: async () => ({ workspaceId: 'ws', role: 'OWNER' }),
  canManageWorkspace: () => true,
}));

import { NextResponse } from 'next/server';
import { withZernioManagement } from '@/lib/zernio/route-handler';

const handler = withZernioManagement(async () => NextResponse.json({ success: true }));
const post = (url: string, origin: string) => handler(new Request(url, { method: 'POST', headers: { origin } }));

afterEach(() => vi.unstubAllEnvs());

describe('Zernio management origin check', () => {
  it('accepts the public NEXTAUTH_URL origin behind a TLS-terminating proxy', async () => {
    vi.stubEnv('NEXTAUTH_URL', 'https://dm.example.com');
    const res = await post('http://dm.example.com/api/zernio/settings', 'https://dm.example.com');
    expect(res.status).toBe(200);
  });

  it('still rejects a foreign origin', async () => {
    vi.stubEnv('NEXTAUTH_URL', 'https://dm.example.com');
    const res = await post('http://dm.example.com/api/zernio/settings', 'https://evil.example');
    expect(res.status).toBe(403);
  });
});
