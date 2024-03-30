'use client';
import dynamic from 'next/dynamic';
import { useTheme } from 'next-themes';

const SandBox = dynamic(
  () => import('@opentf/react-sandbox').then((mod) => mod.SandBox),
  { ssr: false }
);

export default function ReactSandbox({ deps, code, cdns, layout, files }) {
  const { resolvedTheme } = useTheme();
  console.log(resolvedTheme);
  return (
    <div style={{ marginTop: '25px' }}>
      <SandBox
        tabIndex={1}
        files={files}
        deps={deps}
        code={code}
        cdns={cdns}
        layout={layout}
        consoleType="Advanced"
        theme={resolvedTheme}
        style={{ height: '400px' }}
      />
      <div style={{ textAlign: 'right', fontSize: '14px' }}>
        ⚡ by{' '}
        <a
          href="https://github.com/Open-Tech-Foundation/react-sandbox"
          target="_blank"
        >
          React Sandbox
        </a>
      </div>
    </div>
  );
}
