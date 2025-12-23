import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import React from "react";
import { toast } from "sonner";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Copy } from "lucide-react";
import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
type Props = {
  websiteId: string;
  domain: string;
};

const ScriptForm = ({ websiteId, domain }: Props) => {
  const Script = `<script defer data-website-id='${websiteId}' data-domain='${domain}' src="${process.env.NEXT_PUBLIC_HOST_URL}/analytics.js"></script>`;

  const onCopy = () => {
    navigator.clipboard.writeText(Script);
    toast.success("Script copied to Clipboard..");
  };
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Install the WebTrack Script</CardTitle>
          <CardDescription>
            <p className="mt-3">Copy and paste the following script into the &lt;head&gt; section of your website's HTML.</p>
          </CardDescription>
        </CardHeader>
        <Separator />

        <CardContent>
          <div className="w-full mt-5 relative">
            <SyntaxHighlighter
              customStyle={{ borderRadius: 8 }}
              language="javascript"
              style={a11yDark}
            >
              {Script}
            </SyntaxHighlighter>

            <Button
              variant={"outline"}
              size={"icon"}
              className="absolute top-0 right-0 m-3"
              onClick={onCopy}
            >
              <Copy />
            </Button>
          </div>
          <Link href={"/dashboard"}>
            <Button className="w-full mt-7">Ok, I</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default ScriptForm;
