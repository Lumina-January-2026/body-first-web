export interface CommunityProfile {
  id: string;
  user_id: string | null;
  anonymous_id: string | null;
  nickname: string;
  color: string;
  platform: string;
  created_at: string;
}

export interface CommunityPost {
  id: string;
  profile_id: string;
  title: string;
  body: string;
  category: string;
  medications: string[];
  created_at: string;
  profile?: CommunityProfile;
}
