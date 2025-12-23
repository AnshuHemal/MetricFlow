"use client";
import { Button } from "@/components/ui/button";
import { WebsiteType } from "@/configs/type";
import axios from "axios";
import { ArrowLeft, Copy, Loader, Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import SyntaxHighlighter from "react-syntax-highlighter";
import { toast } from "sonner";
import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { Input } from "@/components/ui/input";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const WebsiteSettings = () => {
  const { websiteId } = useParams();
  const [websiteDetail, setWebsiteDetail] = useState<WebsiteType>();
  const [websiteDomain, setWebsiteDomain] = useState<string>();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    getWebsiteDetail();
  }, []);

  const getWebsiteDetail = async () => {
    const result = await axios.get(
      "/api/website?websiteId=" + websiteId + "&websiteOnly=true"
    );
    setWebsiteDetail(result?.data);
    setWebsiteDomain(result?.data?.domain);
  };

  const Script = `<script defer data-website-id='${websiteId}' data-domain='${websiteDetail?.domain}' src="${process.env.NEXT_PUBLIC_HOST_URL}/analytics.js"></script>`;

  const onCopy = () => {
    navigator.clipboard.writeText(Script);
    toast.success("Script copied to Clipboard..");
  };

  const onDeleteWebsite = async () => {
    setLoading(true);
    const result = await axios.delete("/api/website", {
      data: {
        websiteId: websiteId,
      },
    });
    toast.success("Webtrack Removed from " + websiteDomain);
    setLoading(false);
    router.replace("/dashboard");
  };

  return (
    <div className="w-full mt-10 mb-20">
      <Button>
        <ArrowLeft /> Back
      </Button>
      <h2 className="font-bold text-2xl mt-4">
        Settings for {websiteDetail?.domain?.replace("https://", "")}
      </h2>
      <Tabs defaultValue="general" className="w-[800px] mt-6">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="other">Other</TabsTrigger>
        </TabsList>
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>Script</CardTitle>
            </CardHeader>
            <Separator />
            <CardContent>
              <p className="mt-3">
                Copy and paste the following script into the &lt;head&gt;
                section of your website's HTML.
              </p>

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
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Domain</CardTitle>
              <CardDescription>
                Your main website domain for analytics tracking.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Input
                placeholder="website.com"
                value={websiteDomain}
                onChange={(e) => setWebsiteDomain(e.target.value)}
              />
              <div className="flex justify-between mt-2">
                <h2>Your public MetricFlow ID is {websiteId}</h2>
                <Button>Save</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="other">
          <Card>
            <CardHeader>
              <CardTitle>Dange</CardTitle>
            </CardHeader>
            <Separator />
            <CardContent className="flex justify-between mt-3">
              <h2>
                Do you want to delete this website from MetricFlow webtrack ?
              </h2>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button className="text-white" variant={"destructive"}>
                    <Trash /> Delete
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      your account and remove your data from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <Button
                      className="text-white"
                      onClick={() => onDeleteWebsite()}
                      disabled={loading}
                      variant={"destructive"}
                    >
                      {loading ? (
                        <Loader className="animate-spin" />
                      ) : (
                        "Continue to Delete"
                      )}
                    </Button>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WebsiteSettings;
