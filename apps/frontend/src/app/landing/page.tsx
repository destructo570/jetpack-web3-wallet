import SeedPhraseCard from "@/components/common/SeedPhraseCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function page() {
  return (
    <div className="flex justify-center flex-col items-center">
      <h1 className="text-3xl font-bold mb-8">Jetpack wallet 🚀</h1>
      <Tabs defaultValue="import">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="import">Import Wallet</TabsTrigger>
          <TabsTrigger value="create">Create New Wallet</TabsTrigger>
        </TabsList>
        <TabsContent value="import">
          <SeedPhraseCard />
        </TabsContent>
        <TabsContent value="create">
          <SeedPhraseCard is_create={true} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
