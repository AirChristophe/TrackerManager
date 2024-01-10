import { View  , Pressable , Text } from 'react-native';
import { Link } from 'expo-router';

export default function Page() {
  return (
    <View>
        <Text>Home page</Text>
        <Link href="/page1">Page 1</Link>
        <Link href="/page2">Page 2</Link>
        <Link href="/page2" asChild>
            <Pressable>
                <Text>Page 2</Text>
            </Pressable>
        </Link>
    </View>
  );


}