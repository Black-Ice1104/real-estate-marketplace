import { Badge } from "antd";
import { Link } from "react-router-dom";
import Logo from "../../logo.svg";
import dayjs from "dayjs";

import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

export default function UserCard({ user }) {
  return (
    <div className="col-lg-4 p-4 gx-4 gy-4">
      <Link to={`/user/${user.username}`} className="nav-link">
        <Badge.Ribbon text={`x listing`}>
          <div className="card hoverable shadow">
            <img
              src={user?.photo?.Location ?? Logo}
              alt={user.username}
              style={{ height: "250px", objectFit: "cover" }}
            />

            <div className="card-body">
              <div className="d-flex justify-content-between">
                <h3>{user?.username ?? user?.name}</h3>
              </div>

              <p className="card-text">
                Joined {dayjs(user.createdAt).fromNow()}
              </p>
            </div>
          </div>
        </Badge.Ribbon>
      </Link>
    </div>
  );
}