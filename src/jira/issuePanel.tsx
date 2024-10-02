import React, { useEffect, useState } from "react";
import ForgeReconciler, {
  Spinner,
  Text,
  Image,
  SectionMessage,
} from "@forge/react";
import { RandomUserInfo } from "../fetchRandomUser";
import { invoke } from "@forge/bridge";

const App = () => {
  const [userInfo, setUserInfo] = useState<RandomUserInfo | undefined>();
  const [initDone, setInitDone] = useState(false);

  useEffect(() => {
    async function initialise() {
      try {
        const randomUser = await invoke<RandomUserInfo>("getRandomUser");
        setUserInfo(randomUser);
      } catch (err) {
        console.error(err);
      } finally {
        setInitDone(true);
      }
    }
    initialise();
  }, []);

  if (!initDone) {
    return <Spinner />;
  }

  if (!userInfo) {
    return (
      <SectionMessage appearance="warning">
        <Text>No User to Display.</Text>
      </SectionMessage>
    );
  }

  return (
    <>
      <Image src={userInfo.picture.medium} />
      <Text>
        {userInfo.name.first} {userInfo.name.last}
      </Text>

      <Text>{userInfo.dob.age} year old</Text>
      <Text>
        {userInfo.location.city}, {userInfo.location.country}
      </Text>
      <Text>{userInfo.email}</Text>
      <Text>{userInfo.phone}</Text>
    </>
  );
};
ForgeReconciler.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
