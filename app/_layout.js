import { Stack } from "expo-router/stack";
import * as Sentry from "sentry-expo";

Sentry.init({
  dsn: "https://eee40f78fc3eb4bb091cffc7fe96629f@o338749.ingest.sentry.io/4506554246889472",
  enableInExpoDevelopment: true,
  debug: true, // If `true`, Sentry will try to print out useful debugging information if something goes wrong with sending the event. Set it to `false` in production
});

export default function HomeLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        //header: ({route}) => <Handler route={route} />,
        //...TransitionPresets.SlideFromRightIOS,
      }}
    />
  );
}
