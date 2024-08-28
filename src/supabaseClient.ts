import { createClient } from '@supabase/supabase-js';

// 환경변수에서 Supabase Project URL와 Key가져오기
const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL as string;
const SUPABASE_KEY = process.env.REACT_APP_SUPABASE_KEY as string;

// SupaBase 클라이언트 생성 및 초기화
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export default supabase;