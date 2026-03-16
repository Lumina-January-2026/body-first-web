/**
 * Community types — aligned with mobile app's community schema.
 *
 * The mobile app (Expo) and website (Next.js) share the same Supabase project.
 * community_posts uses `user_id` (FK → auth.users) as the primary author key.
 * community_profiles provides display info (nickname/color) linked by user_id.
 *
 * The `community_posts_with_profiles` view joins posts with profile display
 * data, used by the website feed. The mobile app uses `community_posts_public`
 * (which strips user_id for anonymity).
 */

export interface CommunityProfile {
  id: string;
  user_id: string | null;
  anonymous_id: string | null;
  nickname: string;
  color: string;
  platform: string;
  created_at: string;
}

/**
 * Post as returned from the `community_posts_with_profiles` VIEW.
 *
 * The VIEW joins community_posts with community_profiles via user_id
 * (preferred) or profile_id (legacy fallback), returning flat author fields
 * instead of a nested profile object.
 */
export interface CommunityPost {
  id: string;
  profile_id: string;
  user_id: string | null;
  title: string;
  body: string;
  category: string;
  topic: string | null;
  medications: string[];
  image_url: string | null;
  likes_count: number;
  comments_count: number;
  created_at: string;
  updated_at: string;
  /** Flat author fields from the VIEW join */
  author_nickname: string | null;
  author_color: string | null;
}
