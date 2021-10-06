import React from "react";
import { mocked } from "ts-jest/utils";
import { logInAsync } from "expo-google-app-auth";
import { renderHook, act } from "@testing-library/react-hooks";
import { AuthProvider, useAuth } from "../../hooks/auth";

const Providers: React.FC = ({ children }) => (
  <AuthProvider>{children}</AuthProvider>
);

jest.mock("expo-google-app-auth");

describe("Auth Hook", () => {
  it("should be able to sign in with Google account", async () => {
    const googleMocked = mocked(logInAsync);
    googleMocked.mockReturnValue({
      type: "success",
      user: {
        id: 1,
        name: "Gustavo",
        email: "gustavosantanabarbosa867@gmail.com",
        photoUrl: "https://avatars.githubusercontent.com/u/63013756?v=4",
      },
    } as any);

    const { result } = renderHook(() => useAuth(), { wrapper: Providers });

    await act(() => result.current.signInWithGoogle());

    expect(result.current.user.name).toBe("Gustavo");
  });

  it("user should not connect if cancel authentication with Google", async () => {
    const googleMocked = mocked(logInAsync);
    googleMocked.mockReturnValue({
      type: "cancel",
    } as any);

    const { result } = renderHook(() => useAuth(), { wrapper: Providers });

    await act(() => result.current.signInWithGoogle());

    expect(result.current.user).not.toHaveProperty("id");
  });

  it("should be error with incorrectly Google params", async () => {
    const googleMocked = mocked(logInAsync);
    googleMocked.mockReturnValue({} as any);
    const { result } = renderHook(() => useAuth(), { wrapper: Providers });

    try {
      await act(() => result.current.signInWithGoogle());
    } catch (error) {
      expect(result.current.user).toEqual({});
    }
  });
});
