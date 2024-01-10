import { View  , Text } from 'react-native';
import { Link } from 'expo-router';

export default function Page() {
  return (
    <View>
        <Text>Page2</Text>
        <Link href="/">Home</Link>
        <Link href="/page1">Page 1</Link>
    </View>
  );
}