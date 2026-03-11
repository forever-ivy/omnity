import { User, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="space-y-6">
      <Card className="max-w-md macos-card">
        <CardHeader>
          <CardTitle>配置测试</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button className="w-full">
            <User className="w-4 h-4 mr-2" />
            主要按钮
          </Button>
          <Button variant="outline" className="w-full">
            <Settings className="w-4 h-4 mr-2" />
            默认按钮
          </Button>
          <div className="text-primary text-lg">Tailwind 主色调文本</div>
        </CardContent>
      </Card>
    </div>
  );
}
