const ProfileImage = ({ name, styles }: { name: string, styles: string }) => {
    // Generate URL with initials and customization
    const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(
      name
    )}&background=0D8ABC&color=fff`;
  
    return (
      <img
        src={avatarUrl}
        alt={`${name}'s profile`}
        className={styles}
      />
    );
  };
  
  export default ProfileImage;
  