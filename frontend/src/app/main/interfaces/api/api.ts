interface AuthResponse {
    access_token: string;
    refresh_token: string;
    user: {
      id: number;
      username: string;
      email: string;
    };
  }