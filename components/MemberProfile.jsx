import { fetchOrGenerateToken } from '@/utils/actions';
import { UserButton } from '@clerk/nextjs';
import { currentUser, auth } from '@clerk/nextjs/server';

const MemberProfile = async () => {
  const user = await currentUser();
  const { userId } = auth();
  await fetchOrGenerateToken(userId);

  return (
    <div className="flex items-center gap-4">
      <UserButton afterSignOutUrl="/" />
      <p>{user && user.emailAddresses[0].emailAddress}</p>
    </div>
  );
};
export default MemberProfile;
