import { User, Mail } from "lucide-react";

function UserProfileCard({ user }) {
  return (
    <div className="dashboard-card">
      <h4>Profile</h4>

      <p>
        <User size={18} />{" "}
        <strong>
          {user?.firstName} {user?.lastName}
        </strong>
      </p>

      <p>
        <Mail size={18} /> {user?.email}
      </p>
    </div>
  );
}

export default UserProfileCard;