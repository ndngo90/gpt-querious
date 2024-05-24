import { UserProfile } from '@clerk/nextjs';
import { auth } from '@clerk/nextjs/server';
import { fetchUserTokensById } from '@/utils/actions';
const ProfilePage = async () => {
  const { userId } = auth();
  const currentTokens = await fetchUserTokensById(userId);
  return (
    <div>
      <h2 className="mb-4 text-xl font-extrabold">
        Remaining Token: {currentTokens}
      </h2>
      <UserProfile />
    </div>
  );
};
export default ProfilePage;
