---
title: Introduction
sidebar_position: 1
slug: '/'
---

import {SandBox} from '@opentf/react-sandbox';
import demo from '!!raw-loader!@site/src/examples/demo/index';
import store from '!!raw-loader!@site/src/examples/demo/store';
import Header from '!!raw-loader!@site/src/examples/demo/Header';
import counter from '!!raw-loader!@site/src/examples/demo/Counter';
import styles from '!!raw-loader!@site/src/examples/demo/styles.css';

# React State

> A Shared/Global State Management Library for React.

## Features

- Simple API
- No context providers
- Components are re-rendered only when the `selector` value changes
- It can `shallow` diff custom `selector` objects
- It supports `async` actions
- TypeScript support

## Demo

<SandBox
tabIndex={1}
deps={['@opentf/react-state']}
code={demo}
files={{'/store.js': store, '/Header.js': Header, '/Counter.js': counter, '/styles.css': styles}} />
