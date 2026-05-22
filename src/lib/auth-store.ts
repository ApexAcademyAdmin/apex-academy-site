// localStorage-based auth prototype — swap to Supabase later

export type UserRole = "admin" | "coach" | "player" | "parent" | "recruiter" | "public";

export type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  // Player fields
  gradYear?: string;
  position?: string;
  bats?: string;
  throws?: string;
  // Parent fields
  playerName?: string;
  playerGradYear?: string;
  // Recruiter fields
  organization?: string;
  title?: string;
  createdAt: number;
};

const USERS_KEY = "apex_users";
const SESSION_KEY = "apex_session";

function getUsers(): User[] {
  if (typeof window === "undefined") return [];
  return JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
}

function saveUsers(users: User[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function signUp(data: {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  phone?: string;
  gradYear?: string;
  position?: string;
  bats?: string;
  throws?: string;
  playerName?: string;
  playerGradYear?: string;
  organization?: string;
  title?: string;
}): { success: boolean; error?: string } {
  const users = getUsers();
  if (users.find((u) => u.email.toLowerCase() === data.email.toLowerCase())) {
    return { success: false, error: "An account with this email already exists." };
  }

  const user: User = {
    id: Math.random().toString(36).slice(2, 10) + Date.now().toString(36),
    name: data.name,
    email: data.email.toLowerCase(),
    role: data.role,
    phone: data.phone,
    gradYear: data.gradYear,
    position: data.position,
    bats: data.bats,
    throws: data.throws,
    playerName: data.playerName,
    playerGradYear: data.playerGradYear,
    organization: data.organization,
    title: data.title,
    createdAt: Date.now(),
  };

  users.push(user);
  saveUsers(users);

  // Store password separately (base64 — NOT secure, placeholder for Supabase)
  localStorage.setItem(`apex_pw_${user.id}`, btoa(data.password));

  // Auto sign in
  localStorage.setItem(SESSION_KEY, JSON.stringify(user));

  return { success: true };
}

export function signIn(email: string, password: string): { success: boolean; error?: string; user?: User } {
  const users = getUsers();
  const user = users.find((u) => u.email === email.toLowerCase());
  if (!user) return { success: false, error: "No account found with this email." };

  const stored = localStorage.getItem(`apex_pw_${user.id}`);
  if (!stored || atob(stored) !== password) return { success: false, error: "Incorrect password." };

  localStorage.setItem(SESSION_KEY, JSON.stringify(user));
  return { success: true, user };
}

export function signOut() {
  if (typeof window !== "undefined") localStorage.removeItem(SESSION_KEY);
}

export function getCurrentUser(): User | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(SESSION_KEY);
  return raw ? JSON.parse(raw) : null;
}

export function isSignedIn(): boolean {
  return getCurrentUser() !== null;
}

export const ROLE_LABELS: Record<UserRole, string> = {
  admin: "Administrator",
  coach: "Coach / Staff",
  player: "Player",
  parent: "Parent / Guardian",
  recruiter: "Recruiter / Scout",
  public: "Fan",
};
