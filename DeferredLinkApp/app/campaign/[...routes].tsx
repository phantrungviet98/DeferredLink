import {useLocalSearchParams} from "expo-router";
import {ThemedText} from "@/components/ThemedText";

export default () => {
  const params = useLocalSearchParams<{
    from: string
    id: string
  }>()

  return (
    <ThemedText>This is campaign {params.id} from {params.from}</ThemedText>
  )
}