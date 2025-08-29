import axios from "axios";
import { useEffect, useState } from "react";
import { profileRequestInterface } from "../types/profileInterface";
import { useParams } from "react-router-dom";

const LinkComponent = (props: { title: string; url: string }) => {
  return (
    <div className="flex items-center space-x-3 py-1">
      <div className="flex items-center justify-center bg-blue-500 text-white rounded-lg w-10 h-10">
        <span className="material-symbols-outlined link-icon -rotate-45">
          link
        </span>
      </div>

      <div className="flex-1">
        <div>{props.title}</div>
        <div className="text-sm text-gray-500">{props.url}</div>
      </div>
      <a href={props.url} className="text-blue-600">
        Open
      </a>
    </div>
  );
};

const HeaderComponent = (props: { title: string }) => {
  return <span className="font-bold text-lg">{props.title}</span>;
};

const TextComponent = (props: { text: string }) => {
  return <span>{props.text}</span>;
};

export default function Profile(props: { id?: string }) {
  const params = useParams();
  const [profile, setProfile] = useState<profileRequestInterface>();
  const [error, setError] = useState<string | null>(null);
  const profileId = props.id ?? params.profileId;

  useEffect(() => {
    axios
      .get("/api/profile/" + profileId)
      .then((res) => {
        setProfile(res.data);
      })
      .catch(() => {
        setError("Failed to load profile.");
      });
  }, [profileId]);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <main>
      <div className="bg-white p-5 space-y-2 flex flex-col">
        {profile?.items.map((item) => {
          if (item.header) {
            return <HeaderComponent key={item.id} title={item.header.value} />;
          } else if (item.text) {
            return <TextComponent key={item.id} text={item.text.value} />;
          } else if (item.link) {
            return (
              <LinkComponent
                key={item.id}
                url={item.link.value}
                title={item.link.label}
              />
            );
          }
        })}
      </div>

      <div className="bg-white p-5 space-y-2 mt-3">
        <div className="flex items-center space-x-3 py-1">
          <img
            src="https://t.me/i/userpic/320/bioify_bot.jpg"
            className="flex items-center justify-center bg-blue-500 text-white rounded-lg w-10 h-10"
          />

          <div className="flex flex-col">
            <span className="font-bold">Introducting Bioify</span>
            <span className="text-sm text-gray-500">
              This page is made with Bioify. Make your own!
            </span>
          </div>
        </div>
        <button className="w-full p-2 rounded-lg bg-blue-600 text-white">
          <a href="https://t.me/bioify_bot">Try it out!</a>
        </button>
      </div>
    </main>
  );
}
