---
title: "bytedance/UI-TARS-desktop: The Open-Source Multimodal AI Agent Stack: Connecting Cutting-Edge AI Models and Agent Infra"
source: "https://github.com/bytedance/UI-TARS-desktop"
author:
published:
created: 2026-05-09
description: "The Open-Source Multimodal AI Agent Stack: Connecting Cutting-Edge AI Models and Agent Infra - bytedance/UI-TARS-desktop"
tags:
  - "clippings"
---
![Agent TARS Banner](https://github.com/bytedance/UI-TARS-desktop/raw/main/images/tars.png)

## Introduction

English | [简体中文](https://github.com/bytedance/UI-TARS-desktop/blob/main/README.zh-CN.md)

[![](https://camo.githubusercontent.com/ee6d2f93f54ed0e1b0166cab41a108081813376cc7fbe5932d6ad1445e67414f/68747470733a2f2f7472656e6473686966742e696f2f6170692f62616467652f7265706f7369746f726965732f3133353834)](https://trendshift.io/repositories/13584)

**TARS <sup>*</sup>** is a Multimodal AI Agent stack, currently shipping two projects: [Agent TARS](#agent-tars) and [UI-TARS-desktop](#ui-tars-desktop):

| [Agent TARS](#agent-tars) | [UI-TARS-desktop](#ui-tars-desktop) |
| --- | --- |
| **Agent TARS** is a general multimodal AI Agent stack, it brings the power of GUI Agent and Vision into your terminal, computer, browser and product.      It primarily ships with a [CLI](https://agent-tars.com/guide/basic/cli.html) and [Web UI](https://agent-tars.com/guide/basic/web-ui.html) for usage. It aims to provide a workflow that is closer to human-like task completion through cutting-edge multimodal LLMs and seamless integration with various real-world [MCP](https://agent-tars.com/guide/basic/mcp.html) tools. | **UI-TARS Desktop** is a desktop application that provides a native GUI Agent based on the [UI-TARS](https://github.com/bytedance/UI-TARS) model.      It primarily ships a [local](https://github.com/bytedance/UI-TARS-desktop/blob/main/docs/quick-start.md#get-model-and-run-local-operator) and [remote](https://github.com/bytedance/UI-TARS-desktop/blob/main/docs/quick-start.md#run-remote-operator) computer as well as browser operators. |

## Table of Contents

## News

- **\[2025-11-05\]** 🎉 We're excited to announce the release of [Agent TARS CLI v0.3.0](https://github.com/bytedance/UI-TARS-desktop/releases/tag/v0.3.0)! This version brings streaming support for multiple tools (shell commands, multi-file structured display), runtime settings with timing statistics for tool calls and deep thinking, Event Stream Viewer for data flow tracking and debugging. Additionally, it features exclusive support for [AIO agent Sandbox](https://github.com/agent-infra/sandbox) as isolated all-in-one tools execution environment.
- **\[2025-06-25\]** We released an Agent TARS Beta and Agent TARS CLI - [Introducing Agent TARS Beta](https://agent-tars.com/blog/2025-06-25-introducing-agent-tars-beta.html), a multimodal AI agent that aims to explore a work form that is closer to human-like task completion through rich multimodal capabilities (such as GUI Agent, Vision) and seamless integration with various real-world tools.
- **\[2025-06-12\]** - 🎁 We are thrilled to announce the release of UI-TARS Desktop v0.2.0! This update introduces two powerful new features: **Remote Computer Operator** and **Remote Browser Operator** —both completely free. No configuration required: simply click to remotely control any computer or browser, and experience a new level of convenience and intelligence.
- **\[2025-04-17\]** - 🎉 We're thrilled to announce the release of new UI-TARS Desktop application v0.1.0, featuring a redesigned Agent UI. The application enhances the computer using experience, introduces new browser operation features, and supports [the advanced UI-TARS-1.5 model](https://seed-tars.com/1.5) for improved performance and precise control.
- **\[2025-02-20\]** - 📦 Introduced [UI TARS SDK](https://github.com/bytedance/UI-TARS-desktop/blob/main/docs/sdk.md), is a powerful cross-platform toolkit for building GUI automation agents.
- **\[2025-01-23\]** - 🚀 We updated the **[Cloud Deployment](https://github.com/bytedance/UI-TARS-desktop/blob/main/docs/deployment.md#cloud-deployment)** section in the 中文版: [GUI模型部署教程](https://bytedance.sg.larkoffice.com/docx/TCcudYwyIox5vyxiSDLlgIsTgWf#U94rdCxzBoJMLex38NPlHL21gNb) with new information related to the ModelScope platform. You can now use the ModelScope platform for deployment.

## Agent TARS

**Agent TARS** is a general multimodal AI Agent stack, it brings the power of GUI Agent and Vision into your terminal, computer, browser and product.  
  
It primarily ships with a [CLI](https://agent-tars.com/guide/basic/cli.html) and [Web UI](https://agent-tars.com/guide/basic/web-ui.html) for usage. It aims to provide a workflow that is closer to human-like task completion through cutting-edge multimodal LLMs and seamless integration with various real-world [MCP](https://agent-tars.com/guide/basic/mcp.html) tools.

### Showcase

```
Please help me book the earliest flight from San Jose to New York on September 1st and the last return flight on September 6th on Priceline
```

1.00

agent-tars-new-flight.mp4<video src="https://private-user-images.githubusercontent.com/23133919/461250249-772b0eef-aef7-4ab9-8cb0-9611820539d8.mp4?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NzgyNTAxMTksIm5iZiI6MTc3ODI0OTgxOSwicGF0aCI6Ii8yMzEzMzkxOS80NjEyNTAyNDktNzcyYjBlZWYtYWVmNy00YWI5LThjYjAtOTYxMTgyMDUzOWQ4Lm1wND9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNjA1MDglMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjYwNTA4VDE0MTY1OVomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTQyZGZhY2FiOTEzMDVlODQwMWQ2MmU2MDEyOGY2NWMxYzgxMmY2MjAyM2YwNGY1YWE1MDBkZjcxZDcyYmY1NWUmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0JnJlc3BvbnNlLWNvbnRlbnQtdHlwZT12aWRlbyUyRm1wNCJ9.HGn_68RrPs0ICmjXGvzv9LMpIkqHekhtthvOFfSgRtk" controls="controls"></video>

| Booking Hotel | Generate Chart with extra MCP Servers |
| --- | --- |
| 1.00  agent-tars-book-hotel.mp4<video src="https://private-user-images.githubusercontent.com/23133919/461250694-c9489936-afdc-4d12-adda-d4b90d2a869d.mp4?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NzgyNTAxMTksIm5iZiI6MTc3ODI0OTgxOSwicGF0aCI6Ii8yMzEzMzkxOS80NjEyNTA2OTQtYzk0ODk5MzYtYWZkYy00ZDEyLWFkZGEtZDRiOTBkMmE4NjlkLm1wND9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNjA1MDglMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjYwNTA4VDE0MTY1OVomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTViYTM0OGI3NGNmNTM4MjQzNDBlMTNhYzg3YTE3ZDZlMDcxMzNiZDhlMWIxMmNkNDMzYzllODc1NzdjNWY0YWImWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0JnJlc3BvbnNlLWNvbnRlbnQtdHlwZT12aWRlbyUyRm1wNCJ9.4tgTIRQ-sOu-6IEi3bZHg9t2O2lECF05cw4XTWqzlM8" controls="controls"></video> | 1.00  mcp-chart.mp4<video src="https://private-user-images.githubusercontent.com/23133919/460328725-a9fd72d0-01bb-4233-aa27-ca95194bbce9.mp4?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NzgyNTAxMTksIm5iZiI6MTc3ODI0OTgxOSwicGF0aCI6Ii8yMzEzMzkxOS80NjAzMjg3MjUtYTlmZDcyZDAtMDFiYi00MjMzLWFhMjctY2E5NTE5NGJiY2U5Lm1wND9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNjA1MDglMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjYwNTA4VDE0MTY1OVomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTRmMDQ3MDliOTMxYWI4ZjI4N2FjZDdhNTdhY2ZmNzY5MDg4NjI3NjFmMjAwN2E4YjA2ZWU4NTliOTYxYTRhYzQmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0JnJlc3BvbnNlLWNvbnRlbnQtdHlwZT12aWRlbyUyRm1wNCJ9.h2ewm19ScQ7CwN6Z0KhKwFk6URRk0LHUrHqjCiuJxEQ" controls="controls"></video> |
| **Instruction:** *I am in Los Angeles from September 1st to September 6th, with a budget of $5,000. Please help me book a Ritz-Carlton hotel closest to the airport on booking.com and compile a transportation guide for me* | **Instruction:** *Draw me a chart of Hangzhou's weather for one month* |

For more use cases, please check out [#842](https://github.com/bytedance/UI-TARS-desktop/issues/842).

### Core Features

- 🖱️ **One-Click Out-of-the-box CLI** - Supports both **headful** [Web UI](https://agent-tars.com/guide/basic/web-ui.html) and **headless** [server](https://agent-tars.com/guide/advanced/server.html) [execution](https://agent-tars.com/guide/basic/cli.html).
- 🌐 **Hybrid Browser Agent** - Control browsers using [GUI Agent](https://agent-tars.com/guide/basic/browser.html#visual-grounding), [DOM](https://agent-tars.com/guide/basic/browser.html#dom), or a hybrid strategy.
- 🔄 **Event Stream** - Protocol-driven Event Stream drives [Context Engineering](https://agent-tars.com/beta#context-engineering) and [Agent UI](https://agent-tars.com/blog/2025-06-25-introducing-agent-tars-beta.html#easy-to-build-applications).
- 🧰 **MCP Integration** - The kernel is built on MCP and also supports mounting [MCP Servers](https://agent-tars.com/guide/basic/mcp.html) to connect to real-world tools.

### Quick Start

```
# Launch with \`npx\`.
npx @agent-tars/cli@latest

# Install globally, required Node.js >= 22
npm install @agent-tars/cli@latest -g

# Run with your preferred model provider
agent-tars --provider volcengine --model doubao-1-5-thinking-vision-pro-250428 --apiKey your-api-key
agent-tars --provider anthropic --model claude-3-7-sonnet-latest --apiKey your-api-key
```

Visit the comprehensive [Quick Start](https://agent-tars.com/guide/get-started/quick-start.html) guide for detailed setup instructions.

### Documentation

> 🌟 **Explore Agent TARS Universe** 🌟

| Category | Resource Link | Description |
| --- | --- | --- |
| 🏠 **Central Hub** |  | Your gateway to Agent TARS ecosystem |
| 📚 **Quick Start** |  | Zero to hero in 5 minutes |
| 🚀 **What's New** |  | Discover cutting-edge features & vision |
| 🛠️ **Developer Zone** |  | Master every command & features |
| 🎯 **Showcase** |  | View use cases built by the official and community |
| 🔧 **Reference** |  | Complete technical reference |

## UI-TARS Desktop

[![UI-TARS](https://github.com/bytedance/UI-TARS-desktop/raw/main/apps/ui-tars/resources/icon.png)](https://github.com/bytedance/UI-TARS-desktop/blob/main/apps/ui-tars/resources/icon.png)

UI-TARS Desktop is a native GUI agent for your local computer, driven by [UI-TARS](https://github.com/bytedance/UI-TARS) and Seed-1.5-VL/1.6 series models.

📑 [Paper](https://arxiv.org/abs/2501.12326) | 🤗 [Hugging Face Models](https://huggingface.co/ByteDance-Seed/UI-TARS-1.5-7B) | 🫨 [Discord](https://discord.gg/pTXwYVjfcs) | 🤖 [ModelScope](https://www.modelscope.cn/collections/UI-TARS-bccb56fa1ef640)  
🖥️ Desktop Application | 👓 [Midscene (use in browser)](https://github.com/web-infra-dev/midscene)

### Showcase

| Instruction | Local Operator | Remote Operator |
| --- | --- | --- |
| Please help me open the autosave feature of VS Code and delay AutoSave operations for 500 milliseconds in the VS Code setting. | 1.00  computer-use-triple-speed.mp4<video src="https://private-user-images.githubusercontent.com/24872439/435091618-e0914ce9-ad33-494b-bdec-0c25c1b01a27.mp4?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NzgyNTAxMTksIm5iZiI6MTc3ODI0OTgxOSwicGF0aCI6Ii8yNDg3MjQzOS80MzUwOTE2MTgtZTA5MTRjZTktYWQzMy00OTRiLWJkZWMtMGMyNWMxYjAxYTI3Lm1wND9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNjA1MDglMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjYwNTA4VDE0MTY1OVomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTI2ZjVlNDY4YzBkNTViMGMxNWM1ZTI4YjVlZjBjYzViYmRlYTFhMWMwNmE4YTZkMWJiNTdiNjZjN2I1OWQ0NDMmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0JnJlc3BvbnNlLWNvbnRlbnQtdHlwZT12aWRlbyUyRm1wNCJ9.5T08nCwCDEiz3i5s-j2Rij_jWxiL0v-c_8IpTg9kwr0" controls="controls"></video> | 1.00  remote-computer-operators.mp4<video src="https://private-user-images.githubusercontent.com/24872439/454252692-01e49b69-7070-46c8-b3e3-2aaaaec71800.mp4?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NzgyNTAxMTksIm5iZiI6MTc3ODI0OTgxOSwicGF0aCI6Ii8yNDg3MjQzOS80NTQyNTI2OTItMDFlNDliNjktNzA3MC00NmM4LWIzZTMtMmFhYWFlYzcxODAwLm1wND9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNjA1MDglMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjYwNTA4VDE0MTY1OVomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTIzMjQxNWI1MThiMDVjOTRkZDc4ZDAwZDI3MzZmZTg1NzFjODM0ZTc5ODZkYmNkMDc0Yjg2ZThjMDVhOTdmYjcmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0JnJlc3BvbnNlLWNvbnRlbnQtdHlwZT12aWRlbyUyRm1wNCJ9.fDUhCwtf1hEoMmtMcgFhlqBUN-fPGdmRA-Poze3Z3ik" controls="controls"></video> |
| Could you help me check the latest open issue of the UI-TARS-Desktop project on GitHub? | 1.00  browser-use-triple-speed.mp4<video src="https://private-user-images.githubusercontent.com/24872439/435091555-3d159f54-d24a-4268-96c0-e149607e9199.mp4?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NzgyNTAxMTksIm5iZiI6MTc3ODI0OTgxOSwicGF0aCI6Ii8yNDg3MjQzOS80MzUwOTE1NTUtM2QxNTlmNTQtZDI0YS00MjY4LTk2YzAtZTE0OTYwN2U5MTk5Lm1wND9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNjA1MDglMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjYwNTA4VDE0MTY1OVomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPWIxZTlhMTZkZDNmZmNhYmVlZTAxNWRmYzBlMmNmM2VkZTViMjU1ODJmNDUxYTljMmM2ODkxZjhkNGMwOTMyNzAmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0JnJlc3BvbnNlLWNvbnRlbnQtdHlwZT12aWRlbyUyRm1wNCJ9.5iRUzNMux-M-jq9tNDee46wd3eZMVrN9qVAyY0JkmH4" controls="controls"></video> | 1.00  remote-browser-operators.mp4<video src="https://private-user-images.githubusercontent.com/24872439/454257353-072fb72d-7394-4bfa-95f5-4736e29f7e58.mp4?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NzgyNTAxMTksIm5iZiI6MTc3ODI0OTgxOSwicGF0aCI6Ii8yNDg3MjQzOS80NTQyNTczNTMtMDcyZmI3MmQtNzM5NC00YmZhLTk1ZjUtNDczNmUyOWY3ZTU4Lm1wND9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNjA1MDglMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjYwNTA4VDE0MTY1OVomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTE2MThiNWI5NTcxZTlkMzhkNzcxNzY1MDVjMjE5MWM4ZGMzYjJiMDc0MTYyZDU3ZDk3ZTFlMTczZGRhMzk5YWUmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0JnJlc3BvbnNlLWNvbnRlbnQtdHlwZT12aWRlbyUyRm1wNCJ9.VrZQAfXs82goxq9H1NBKuDpf9ta3qNK5sy8T49B9-8w" controls="controls"></video> |

### Features

- 🤖 Natural language control powered by Vision-Language Model
- 🖥️ Screenshot and visual recognition support
- 🎯 Precise mouse and keyboard control
- 💻 Cross-platform support (Windows/MacOS/Browser)
- 🔄 Real-time feedback and status display
- 🔐 Private and secure - fully local processing

### Quick Start

See [Quick Start](https://github.com/bytedance/UI-TARS-desktop/blob/main/docs/quick-start.md)

## Contributing

See [CONTRIBUTING.md](https://github.com/bytedance/UI-TARS-desktop/blob/main/CONTRIBUTING.md).

## License

This project is licensed under the Apache License 2.0.

## Citation

If you find our paper and code useful in your research, please consider giving a star ⭐ and citation 📝

```
@article{qin2025ui,
  title={UI-TARS: Pioneering Automated GUI Interaction with Native Agents},
  ={Qin, Yujia and Ye, Yining and Fang, Junjie and Wang, Haoming and Liang, Shihao and Tian, Shizuo and Zhang, Junda and Li, Jiahao and Li, Yunxin and Huang, Shijue and others},
  journal={arXiv preprint arXiv:2501.12326},
  year={2025}
}
```