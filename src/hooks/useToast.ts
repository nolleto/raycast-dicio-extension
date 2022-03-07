import { Toast, showToast } from "@raycast/api";

import { useRef } from "react";

type ToastOptions = Toast.Options

type useToastResult = {
  show: (overrideOptions: ToastOptions) => void;
  hide: () => void;
}

const useToast = (options: Partial<ToastOptions>): useToastResult => {
  const toast = useRef<Toast>()

  const show = async (overrideOptions: ToastOptions) => {
    const finalOptions = {
      ...options,
      ...overrideOptions,
    }

    toast.current = await showToast(finalOptions)
  }

  const hide = () => {
    toast.current?.hide()
  }

  return { show, hide }
}

export { Toast }
export default useToast
