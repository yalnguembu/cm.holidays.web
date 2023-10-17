import { onBeforeUnmount, onMounted } from "vue";
import type { Ref } from "vue";

export const useDetectOutsideClick = (
  component: Ref<HTMLElement | undefined>,
  callback: () => void
) => {

  if (!component) return;
  const listener = (event: Event): void => {
    if (
      event.target !== component.value &&
      event.composedPath().includes(component.value as HTMLElement)
    ) {
      return;
    }
    callback();
  };
  onMounted(() => {
    window.addEventListener("click", listener);
  });
  onBeforeUnmount(() => {
    window.removeEventListener("click", listener);
  });

  return { listener };
};
