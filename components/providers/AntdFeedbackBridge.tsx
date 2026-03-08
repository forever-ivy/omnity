"use client";

import { useEffect } from "react";
import { App } from "antd";
import { registerMessageApi } from "@/lib/feedback";

interface AntdFeedbackBridgeProps {
  children: React.ReactNode;
}

export function AntdFeedbackBridge({
  children,
}: AntdFeedbackBridgeProps) {
  const { message } = App.useApp();

  useEffect(() => {
    registerMessageApi(message);

    return () => {
      registerMessageApi(null);
    };
  }, [message]);

  return <>{children}</>;
}
