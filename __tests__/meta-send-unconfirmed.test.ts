import { describe, expect, it, vi } from 'vitest';

const sendPrivateReply = vi.hoisted(() => vi.fn());
vi.mock('@/lib/meta/client', async (importOriginal) => ({
  ...(await importOriginal<typeof import('@/lib/meta/client')>()),
  sendPrivateReply,
}));

import { MetaApiError } from '@/lib/meta/client';
import { ZernioDeliveryUnconfirmedError } from '@/lib/zernio/client';
import { sendPrivateReply as send } from '@/lib/instagram/send-messages';
import type { InstagramContext } from '@/lib/instagram/context';

const context = { provider: 'META', accessToken: 'token' } as unknown as InstagramContext;
const failureOf = async () => {
  try {
    await send({ context, instagramAccountId: 'ig', commentId: 'c1', message: 'hi' });
  } catch (error) {
    return error;
  }
  throw new Error('expected the send to fail');
};

describe('Meta sends with ambiguous errors', () => {
  it.each([1, 2])('treats Meta code %i as unconfirmed so the worker does not resend', async (code) => {
    sendPrivateReply.mockImplementation(async () => { throw new MetaApiError(code, undefined, 'trace', 'An unknown error has occurred.'); });
    expect(await failureOf()).toBeInstanceOf(ZernioDeliveryUnconfirmedError);
  });

  it('passes definite Meta errors through unchanged', async () => {
    const definite = new MetaApiError(100, 2534001, 'trace', 'Invalid parameter');
    sendPrivateReply.mockImplementation(async () => { throw definite; });
    expect(await failureOf()).toBe(definite);
  });

  it('returns the Meta result on success', async () => {
    sendPrivateReply.mockResolvedValue({ message_id: 'm1' });
    await expect(send({ context, instagramAccountId: 'ig', commentId: 'c1', message: 'hi' })).resolves.toEqual({ message_id: 'm1' });
  });
});
