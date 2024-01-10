import { View  , Text } from 'react-native';
import { Link } from 'expo-router';

export default function Page() {
  return (
    <View>
        <Text>Page1</Text>
        <Link href="/">Home</Link>
    </View>
  );
}