const wait = (ms = 350) => new Promise((r) => setTimeout(r, ms));

export const authApi = {
  async login(
    email: string,
    password: string,
  ): Promise<{ token: string; email: string }> {
    await wait();
    if (!email || !password) throw new Error("Email and password required");
    // Replace with real call. Accepts any credentials in mock mode.
    return { token: "mock_admin_token", email };
  },
  async logout(): Promise<void> {
    await wait(80);
  },
};
