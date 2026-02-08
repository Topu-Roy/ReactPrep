"use client";

import { useMutation } from "@tanstack/react-query";
import { authClient } from "@/auth/auth-client";
import { type OAuthProvider } from "@/auth/types";

export function useSignIn() {
  return useMutation({
    mutationFn: ({ provider }: { provider: OAuthProvider }) =>
      authClient.signIn.social({
        provider,
      }),
  });
}
