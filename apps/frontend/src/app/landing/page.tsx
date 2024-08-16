import SeedPhraseCard from "@/components/common/SeedPhraseCard";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function page() {
  return (
    <Tabs defaultValue="import">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="import">Import Wallet</TabsTrigger>
        <TabsTrigger value="create">Create New Wallet</TabsTrigger>
      </TabsList>
      <TabsContent value="import">
        <SeedPhraseCard />
      </TabsContent>
      <TabsContent value="create">
        <SeedPhraseCard is_create={true}/>
      </TabsContent>
    </Tabs>
  );
}
