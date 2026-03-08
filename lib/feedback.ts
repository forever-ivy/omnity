type MessageApi = {
  error: (content: string) => void;
  info: (content: string) => void;
  success: (content: string) => void;
  warning: (content: string) => void;
};

type FeedbackLevel = keyof MessageApi;

let messageApi: MessageApi | null = null;

export function registerMessageApi(api: MessageApi | null) {
  messageApi = api;
}

function fallbackToConsole(level: FeedbackLevel, content: string) {
  if (typeof window === "undefined") {
    return;
  }

  const consoleMethodByLevel = {
    error: console.error,
    info: console.info,
    success: console.info,
    warning: console.warn,
  } satisfies Record<FeedbackLevel, (content: string) => void>;

  consoleMethodByLevel[level](`[feedback] ${content}`);
}

function notify(level: FeedbackLevel, content: string) {
  if (messageApi) {
    messageApi[level](content);
    return;
  }

  fallbackToConsole(level, content);
}

export function notifyError(content: string) {
  notify("error", content);
}

export function notifyInfo(content: string) {
  notify("info", content);
}

export function notifySuccess(content: string) {
  notify("success", content);
}

export function notifyWarning(content: string) {
  notify("warning", content);
}
