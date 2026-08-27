import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { Session, User } from '@supabase/supabase-js';
import { supabase, type Member } from '@/lib/supabase';

type AuthContextValue = {
  session: Session | null;
  user: User | null;
  member: Member | null;
  loading: boolean;
  signUp: (email: string, password: string) => Promise<{ error: string | null }>;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
  refreshMember: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [member, setMember] = useState<Member | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchMember = async (userId: string) => {
    const { data, error } = await supabase
      .from('members')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle();
    if (error) {
      console.error('Failed to fetch member:', error.message);
      setMember(null);
      return;
    }
    setMember(data as Member | null);
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      if (data.session?.user) {
        fetchMember(data.session.user.id).finally(() => setLoading(false));
      } else {
        setLoading(false);
      }
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
      if (newSession?.user) {
        fetchMember(newSession.user.id);
      } else {
        setMember(null);
      }
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string) => {
    const { error } = await supabase.auth.signUp({ email, password });
    return { error: error?.message ?? null };
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error: error?.message ?? null };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setMember(null);
  };

  const refreshMember = async () => {
    if (session?.user) await fetchMember(session.user.id);
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        user: session?.user ?? null,
        member,
        loading,
        signUp,
        signIn,
        signOut,
        refreshMember,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
