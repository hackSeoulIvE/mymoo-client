import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

type ToastPortalProps = {
  children: React.ReactNode;
};

export default function ToastPortal({
  children,
}: ToastPortalProps): React.ReactPortal | null {
  const [el, setEl] = useState<HTMLElement | null>(null);

  useEffect(() => {
    let element = document.getElementById('toast');
    let created = false;

    if (!element) {
      element = document.createElement('div');
      element.id = 'toast';
      document.body.appendChild(element);
      created = true;
    }

    setEl(element);

    return () => {
      if (created && element) {
        document.body.removeChild(element);
      }
    };
  }, []);

  if (!el) return null;
  return ReactDOM.createPortal(children, el);
}
