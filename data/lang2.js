(window.RA_DOMAINS = window.RA_DOMAINS || []).push(
{
  id: "08", name: "可解释性", en: "Interpretability", branch: "lang",
  tagline: "打开黑箱：模型内部到底表示了什么、怎么计算的。一张卡就能做出一流工作的少数方向之一。",
  meters: [3, 1, 3, 3],
  leaves: ["特征归因 Saliency / IG", "探针 Probing", "机制可解释性 Circuits", "叠加 Superposition", "稀疏自编码器 SAE", "激活修补与因果干预", "归因图 / 电路追踪", "模型编辑 ROME", "表征工程 / Steering", "CoT 忠实性", "概念方法 TCAV"],
  keywords: ["interpretability", "SAE", "circuits", "mechanistic", "可解释"],
  overview: [
    "早期可解释性主要是<b>归因</b>（哪些输入像素/词对输出重要：Saliency、Integrated Gradients）和<b>探针</b>（某个信息是否线性可读）。它们回答“看哪里”，却回答不了“怎么算”。",
    "<b>机制可解释性</b>试图逆向工程网络的算法：从 InceptionV1 的视觉电路，到 Transformer 的归纳头（induction heads）、间接宾语识别电路。核心障碍是<b>叠加</b>——神经元同时编码多个概念。<b>稀疏自编码器（SAE）</b>把激活分解为大量稀疏、单义的特征，2023–2024 年被扩展到前沿模型；2025 年的<b>归因图/电路追踪</b>开始描绘模型内部的多步推理与规划。",
    "这个领域同时面临自我审视：SAE 特征在下游任务上未必优于简单线性探针，解释的“忠实性”很难验证。所以当下最有价值的工作是<b>能被检验的解释</b>和<b>用解释做成别的方法做不到的事</b>（发现并修复 bug、安全审计）。"
  ],
  frontier: [
    ["电路追踪与归因图", "用 transcoder / cross-layer transcoder 替换 MLP，构建可读的计算图，研究多跳推理、规划、幻觉的内部机制。"],
    ["SAE 的规模化与质疑", "Gemma Scope 等开源大规模 SAE；同时有工作指出 SAE 在探针等任务上不敌基线——需要更好的评估（SAEBench）。"],
    ["表征操控（Steering）", "通过加减激活方向控制拒答、情感、真实性；与对齐（26）直接相关。"],
    ["CoT 可监控性", "推理模型的思维链是否忠实反映内部计算？能否作为安全监控手段？"],
    ["非语言模型的可解释性", "视觉模型、扩散模型、VLA/机器人策略的机制解释几乎是空白。"]
  ],
  ideas: [
    ["用可解释性找到并修复一个真实缺陷", "领域最缺的是“只有通过解释才能做到”的成功案例。如果你用 SAE/电路发现了一个模型的系统性错误并修复它，说服力远超一篇新方法。", "选一个开源小模型的已知失败（如特定格式算术错误），用激活修补定位相关组件，做针对性编辑，评估修复与副作用。"],
    ["植入真值的可解释性基准", "解释方法难评估是因为没有真值。用编译/训练方式往模型里“埋”已知算法，再看解释方法能否找回，是干净的评测框架。", "用 Tracr 或有监督训练把已知电路植入小 Transformer，测试 SAE、探针、归因图恢复已知结构的准确率。"],
    ["机器人/视觉策略的机制解释", "VLA 与扩散策略被大量部署却几乎无人解释。第一批扎实的工作会定义这个子领域。", "在 LIBERO 上训练的小策略模型中，用探针和激活修补寻找“物体位置”“任务阶段”表征，并干预验证因果性。"]
  ],
  prereq: {
    must: ["Transformer 每一层的计算（残差流视角尤其重要）", "线性代数：投影、子空间、低秩分解", "PyTorch hooks 或 TransformerLens / nnsight 的使用", "因果干预思维：激活修补、消融、对照实验设计", "读过 Anthropic 的 Transformer Circuits 系列"],
    nice: ["稀疏编码与字典学习", "因果推断基础", "统计检验（解释结论需要显著性）"]
  },
  setup: {
    data: "模型本身就是研究对象；激活数据来自 The Pile / OpenWebText 子集；任务数据常为自构造的提示集合（如 IOI 句式）。",
    compute: "GPT-2 small、Pythia、Gemma-2-2B 上的电路分析单卡即可；训练 SAE 1–8 卡、数小时到数天。",
    code: "TransformerLens、nnsight、SAELens、Gemma Scope、Neuronpedia、circuit-tracer。",
    bench: "无统一标准；常用干预后的行为变化、SAEBench、特征可解释性自动评分、真值恢复率。",
    improve: "分解方法（SAE 变体、transcoder）、评估方法、自动化解释流程、面向应用的解释（安全、调试）。",
    venue: "NeurIPS / ICLR / ICML、ACL / EMNLP；Transformer Circuits Thread、Distill 风格博客、AI Alignment Forum"
  },
  recipe: ["选择一个清晰、可复现的模型行为", "构造干净/污染提示对，做激活修补定位关键组件", "提出机制假设（哪些头/特征做什么）", "用干预实验验证（消融、注入、steering），报告效应量", "讨论假设的边界与反例"],
  fit: {
    yes: ["好奇心驱动，喜欢“侦探式”研究", "算力有限但思考深入", "关心 AI 安全"],
    no: ["需要明确的 SOTA 数字来证明自己", "不喜欢开放式、定义模糊的问题"]
  },
  trial: [
    ["Day 1–3", "读 A Mathematical Framework for Transformer Circuits；做 ARENA 可解释性教程前两章。"],
    ["Day 4–7", "用 TransformerLens 在 GPT-2 small 上复现 IOI 电路的激活修补图。"],
    ["Day 8–11", "在 Neuronpedia 浏览 Gemma Scope 特征；用 SAELens 加载一个 SAE，找 10 个有趣特征并做 steering。"],
    ["Day 12–14", "提一个关于模型某行为的机制假设并尝试验证，写成一篇短博客。"]
  ],
  classic: [
    ["Axiomatic Attribution for Deep Networks", "Sundararajan, Taly, Yan", 2017, "ICML", "Integrated Gradients。"],
    ["Interpretability Beyond Feature Attribution: Quantitative Testing with Concept Activation Vectors (TCAV)", "Kim et al.", 2018, "ICML", "概念方法。"],
    ["Zoom In: An Introduction to Circuits", "Olah et al.", 2020, "Distill", "电路范式宣言。"],
    ["A Mathematical Framework for Transformer Circuits", "Elhage et al.", 2021, "Transformer Circuits Thread", "残差流视角。"],
    ["In-context Learning and Induction Heads", "Olsson et al.", 2022, "Transformer Circuits Thread", "归纳头。"],
    ["Toy Models of Superposition", "Elhage et al.", 2022, "Transformer Circuits Thread", "叠加。"],
    ["Locating and Editing Factual Associations in GPT", "Meng et al.", 2022, "NeurIPS", "ROME。"],
    ["Interpretability in the Wild: a Circuit for Indirect Object Identification in GPT-2 small", "Wang et al.", 2023, "ICLR", "IOI 电路。"]
  ],
  recent: [
    ["Towards Monosemanticity: Decomposing Language Models With Dictionary Learning", "Bricken et al.", 2023, "Transformer Circuits Thread", "SAE 奠基。"],
    ["Representation Engineering: A Top-Down Approach to AI Transparency", "Zou et al.", 2023, "arXiv", "表征工程。"],
    ["Scaling Monosemanticity: Extracting Interpretable Features from Claude 3 Sonnet", "Templeton et al.", 2024, "Transformer Circuits Thread", "SAE 规模化。"],
    ["Gemma Scope: Open Sparse Autoencoders Everywhere All At Once on Gemma 2", "Lieberum et al.", 2024, "arXiv", "开源 SAE 套件。"],
    ["On the Biology of a Large Language Model", "Lindsey et al.", 2025, "Transformer Circuits Thread", "归因图研究多步推理。"],
    ["Chain of Thought Monitorability: A New and Fragile Opportunity for AI Safety", "Korbak et al.", 2025, "arXiv", "CoT 监控。"]
  ]
},
{
  id: "09", name: "LLM 智能体", en: "LLM Agents", branch: "lang",
  tagline: "从“回答问题”到“完成任务”：调用工具、操作电脑、写代码、做研究。环境与评测是这个领域真正的护城河。",
  meters: [2, 3, 5, 5],
  leaves: ["ReAct 与工具调用", "规划与任务分解", "记忆与长期记忆", "RAG 检索增强", "上下文工程", "Coding Agent", "Computer Use / GUI Agent", "Deep Research Agent", "MCP 与工具协议", "Agentic RL", "评测与安全 / Prompt Injection"],
  keywords: ["agent", "智能体", "RAG", "SWE-bench", "tool use", "MCP"],
  overview: [
    "LLM 智能体 = LLM + 循环（观察-思考-行动）+ 工具 + 记忆。ReAct（2022）确立了“交替推理与行动”的基本模式；Toolformer、函数调用让模型学会使用 API；RAG 让模型接入外部知识。",
    "2024–2025 年的主线是<b>真实环境中的长程任务</b>：SWE-bench 上的代码修复从个位数提升到 70%+，OSWorld 等计算机操作基准快速进步，Deep Research 类产品让模型自主检索与写报告。驱动力从“提示工程 / 脚手架设计”逐步转向<b>在环境中做强化学习训练智能体</b>。",
    "学术界的优势在：<b>构建新环境与基准</b>（可验证、可复现、可重置）、<b>失败分析</b>、<b>记忆与上下文管理</b>、<b>安全</b>（prompt injection、越权操作）、以及中小规模的 agentic RL。这个领域入门门槛低、API 即可起步，但真正的好工作需要严谨的评测设计。"
  ],
  frontier: [
    ["Agentic RL", "在代码、搜索、网页环境中端到端多轮 RL（SWE-RL、Search-R1、WebRL 等）；长程信用分配与稀疏奖励是核心难题。"],
    ["Coding Agent", "SWE-bench Verified 被逐步刷高，前沿转向更长任务（整个仓库/功能开发）、测试生成与自我验证。"],
    ["Computer Use", "基于截图的 GUI 操作（OSWorld、WebArena）；视觉定位、错误恢复与安全确认。"],
    ["记忆与上下文工程", "百轮以上交互中如何压缩、检索、遗忘；上下文窗口不是记忆。"],
    ["Agent 安全", "提示注入、工具滥用、权限控制、可审计性；基准如 AgentDojo。"]
  ],
  ideas: [
    ["构建一个“可验证、可重置”的新环境", "智能体研究最稀缺的是好环境。一个设计精良、有自动验证的环境（如某个专业软件、科研流程）会被大量论文用作训练与评测场。", "选一个你熟悉的专业工作流（如医学影像标注软件、数据分析），封装成 Docker 环境 + 50 个带自动判分的任务，测 3 个前沿模型。"],
    ["智能体失败的分类学与自动诊断", "大家只报成功率，很少有人系统研究“为什么失败”。可复用的失败分类 + 自动诊断工具能指导所有后续改进。", "收集某基准上 300 条失败轨迹，人工标注失败类型，训练/提示一个诊断器，验证按诊断结果修改脚手架后的提升。"],
    ["什么时候该问人", "完全自主不一定最好。智能体对自身不确定性的校准、主动澄清的时机，是落地的关键也是干净的研究问题。", "在 τ-bench 类任务中引入可询问的模拟用户，比较不同提问策略下成功率与提问次数的帕累托前沿。"]
  ],
  prereq: {
    must: ["LLM 基础与 API 使用（06）", "Python 工程能力：异步、Docker、沙箱、日志", "ReAct / 函数调用 / RAG 的实现原理", "评测设计（23）：方差、成本、污染", "至少读通一个 agent 框架源码（如 SWE-agent / OpenHands）"],
    nice: ["强化学习（10）与 RL 框架（verl）", "向量数据库与检索系统", "Web 自动化（Playwright）与操作系统知识"]
  },
  setup: {
    data: "环境即数据：SWE-bench（2294 题，Verified 子集 500）、WebArena、OSWorld（369 任务）、GAIA、τ-bench；训练轨迹 SWE-Gym、AgentInstruct 等。",
    compute: "评测型工作主要花 API 费用（一次完整基准可达数百美元）；训练 7–32B 智能体需 8–64 张 H100；推理用 vLLM 部署开源模型可降低成本。",
    code: "SWE-agent、OpenHands、LangGraph、AutoGen、browser-use、verl / OpenRLHF + 自定义环境、MCP SDK。",
    bench: "任务成功率（pass@1）、成本与步数、pass^k（一致性）、安全违规率。",
    improve: "脚手架与工具接口设计、检索与记忆、轨迹数据合成、RL 训练、验证与自我修正、安全防护。",
    venue: "NeurIPS / ICLR / ICML / ACL / EMNLP / COLM；大量工作伴随开源环境与排行榜"
  },
  recipe: ["选或建一个可复现的环境", "跑强模型基线并分析失败轨迹", "设计改进（接口 / 记忆 / 训练）", "报告成功率 + 成本 + 方差（多次运行）", "开源环境、轨迹与代码"],
  fit: {
    yes: ["工程能力强，喜欢做系统", "对产品落地敏感", "算力不多但有 API 预算"],
    no: ["想做数学优雅的方法", "受不了评测成本与随机性"]
  },
  trial: [
    ["Day 1–3", "读 ReAct、SWE-agent；不用框架，自己写 150 行的 ReAct 智能体（工具：搜索 + Python 执行）。"],
    ["Day 4–7", "在 SWE-bench Lite 的 20 题上跑 SWE-agent 或 OpenHands，阅读每条失败轨迹。"],
    ["Day 8–11", "改一处（工具接口、检索策略或提示），测成功率变化与成本。"],
    ["Day 12–14", "写一份失败分类表。若你从中看到一个环境或方法的机会——继续。"]
  ],
  classic: [
    ["Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks", "Lewis et al.", 2020, "NeurIPS", "RAG。"],
    ["ReAct: Synergizing Reasoning and Acting in Language Models", "Yao et al.", 2023, "ICLR", "智能体基本范式。"],
    ["Toolformer: Language Models Can Teach Themselves to Use Tools", "Schick et al.", 2023, "NeurIPS", "工具学习。"],
    ["Reflexion: Language Agents with Verbal Reinforcement Learning", "Shinn et al.", 2023, "NeurIPS", "语言反思。"],
    ["Tree of Thoughts: Deliberate Problem Solving with Large Language Models", "Yao et al.", 2023, "NeurIPS", "搜索式推理。"],
    ["Generative Agents: Interactive Simulacra of Human Behavior", "Park et al.", 2023, "UIST", "记忆与模拟社会。"],
    ["Voyager: An Open-Ended Embodied Agent with Large Language Models", "Wang et al.", 2023, "arXiv", "技能库与终身学习。"]
  ],
  recent: [
    ["SWE-bench: Can Language Models Resolve Real-World GitHub Issues?", "Jimenez et al.", 2024, "ICLR", "代码智能体基准。"],
    ["SWE-agent: Agent-Computer Interfaces Enable Automated Software Engineering", "Yang et al.", 2024, "NeurIPS", "接口设计的重要性。"],
    ["OSWorld: Benchmarking Multimodal Agents for Open-Ended Tasks in Real Computer Environments", "Xie et al.", 2024, "NeurIPS", "计算机操作基准。"],
    ["τ-bench: A Benchmark for Tool-Agent-User Interaction in Real-World Domains", "Yao et al.", 2024, "arXiv", "工具-用户交互。"],
    ["SWE-RL: Advancing LLM Reasoning via Reinforcement Learning on Open Software Evolution", "Wei et al.", 2025, "arXiv", "代码智能体 RL。"],
    ["Search-R1: Training LLMs to Reason and Leverage Search Engines with Reinforcement Learning", "Jin et al.", 2025, "arXiv", "搜索智能体 RL。"]
  ]
},
{
  id: "26", name: "对齐与安全", en: "Alignment & Safety", branch: "lang",
  tagline: "让越来越强的模型做我们真正想要的事，并在它不想时也能发现。问题定义仍在形成中，早期进入的人在定义领域。",
  meters: [3, 2, 3, 4],
  leaves: ["RLHF / 偏好学习", "宪法 AI / RLAIF", "奖励黑客", "可扩展监督", "弱到强泛化", "越狱与对抗攻击", "红队测试", "欺骗 / 谋划评估", "AI Control", "机器遗忘 Unlearning", "危险能力评估"],
  keywords: ["alignment", "safety", "对齐", "安全", "jailbreak", "越狱", "RLHF"],
  overview: [
    "对齐研究关注两个问题：<b>如何把人的意图准确地传给模型</b>（RLHF、宪法 AI、偏好学习），以及<b>当模型能力超过监督者时如何保持控制</b>（可扩展监督、弱到强泛化、AI Control）。安全研究则覆盖越狱攻击、滥用防护、危险能力评估。",
    "2024–2025 年出现了一批让人警醒的实证工作：模型会<b>伪装对齐</b>（在认为被训练时改变行为）、在上下文中<b>谋划</b>、窄域微调会导致<b>广泛失准</b>（emergent misalignment）、推理模型会<b>奖励黑客</b>。这些现象可以在开源模型上复现和研究，学术界参与门槛不高。",
    "这个领域的特点是：问题重要性高、成熟基准少、需要非常严谨的实验设计（避免“诱导出”想要的结果）。好的工作往往是<b>清晰地展示一个现象</b>或<b>给出可度量的防御</b>。"
  ],
  frontier: [
    ["推理模型的奖励黑客与 CoT 监控", "RL 训练出的模型会利用评测漏洞；用思维链监控是否能发现，以及优化压力是否会让 CoT 变得不忠实。"],
    ["欺骗与谋划评估", "Alignment faking、in-context scheming 等评估框架；如何区分真实倾向与被提示诱导。"],
    ["涌现失准", "窄任务（如写不安全代码）微调导致模型在无关领域表现出失准倾向——机制与防御仍未知。"],
    ["AI Control", "假设模型可能不可信，设计监控与协议仍能安全使用它。"],
    ["越狱防御", "宪法分类器等系统级防御；对抗鲁棒性的评测标准化（HarmBench）。"]
  ],
  ideas: [
    ["在小模型上复现并解释一个失准现象", "前沿实验室报告的现象大多只在闭源大模型上展示。如果能在 1–8B 开源模型上稳定复现，并结合可解释性（08）找到机制，就打开了整个学术界的研究通道。", "选 emergent misalignment，用 Qwen2.5-7B 复现窄域微调，测失准率随数据量的变化，并用探针寻找“失准方向”。"],
    ["监督信号质量的可度量框架", "可扩展监督的核心是弱监督者能否给出好信号。在有真值的任务上量化“监督者-被监督者能力差 vs 最终性能”，可为后续方法提供标尺。", "在数学题上用不同大小模型作监督者训练强模型，绘制弱到强的性能恢复率曲线，比较辩论、批评等协议。"],
    ["数据层面 vs 训练后层面的防御比较", "危险知识应该在预训练数据中过滤，还是在后训练中遗忘/拒答？系统比较能直接指导实践。", "在小模型上分别做数据过滤与 unlearning，用 WMDP 与微调攻击（少量数据恢复能力）测鲁棒性。"]
  ],
  prereq: {
    must: ["LLM 后训练（06）：SFT、RLHF、DPO", "严谨实验设计与对照（23）——这里最容易做出“假阳性”", "开源模型微调与评测工具（TRL、inspect、HarmBench）", "读过 Concrete Problems in AI Safety 等奠基文献"],
    nice: ["可解释性（08）", "博弈论与机制设计", "强化学习（10）中的奖励设计与 reward hacking"]
  },
  setup: {
    data: "偏好数据 HH-RLHF、PKU-SafeRLHF；攻击评测 HarmBench、AdvBench、JailbreakBench；知识风险 WMDP；欺骗评估多为自构造情境。",
    compute: "7–8B 模型微调与评测 1–8 卡；多数现象研究在单机内完成。",
    code: "TRL、OpenRLHF、inspect（UK AISI）、HarmBench、garak。",
    bench: "攻击成功率、拒答率与过度拒答、失准率、监督恢复率；常需人工复核。",
    improve: "训练目标、数据、监控协议、防御分类器、评估方法与情境设计。",
    venue: "NeurIPS / ICLR / ICML、ACL / EMNLP、SaTML；AI Alignment Forum、实验室技术报告"
  },
  recipe: ["清晰定义要展示的现象或要防御的威胁模型", "设计排除“被提示诱导”等替代解释的对照组", "在多个模型、多个规模上复现", "报告效应量、置信区间与失败案例", "讨论局限与潜在误用（负责任披露）"],
  fit: {
    yes: ["真心关心 AI 长期影响", "思维严谨、喜欢挑别人实验的漏洞", "对前沿实验室安全团队感兴趣"],
    no: ["想要明确的指标与排行榜", "不喜欢模糊和争议"]
  },
  trial: [
    ["Day 1–3", "读 Concrete Problems in AI Safety、Constitutional AI、Alignment Faking 摘要与主要图。"],
    ["Day 4–7", "用 HarmBench 测一个开源模型的越狱成功率，体会评测细节。"],
    ["Day 8–11", "复现一个小现象（如窄域微调导致的拒答变化），设计一个对照组。"],
    ["Day 12–14", "写一页“威胁模型 + 实验设计”，问自己：这个结论能被怀疑者反驳吗？"]
  ],
  classic: [
    ["Concrete Problems in AI Safety", "Amodei et al.", 2016, "arXiv", "问题地图。"],
    ["Deep Reinforcement Learning from Human Preferences", "Christiano et al.", 2017, "NeurIPS", "RLHF 起源。"],
    ["AI Safety via Debate", "Irving, Christiano, Amodei", 2018, "arXiv", "可扩展监督。"],
    ["Constitutional AI: Harmlessness from AI Feedback", "Bai et al.", 2022, "arXiv", "RLAIF。"],
    ["Universal and Transferable Adversarial Attacks on Aligned Language Models", "Zou et al.", 2023, "arXiv", "GCG 越狱攻击。"],
    ["Weak-to-Strong Generalization: Eliciting Strong Capabilities With Weak Supervision", "Burns et al.", 2024, "ICML", "弱到强。"]
  ],
  recent: [
    ["Sleeper Agents: Training Deceptive LLMs that Persist Through Safety Training", "Hubinger et al.", 2024, "arXiv", "后门在安全训练后持续存在。"],
    ["AI Control: Improving Safety Despite Intentional Subversion", "Greenblatt et al.", 2024, "ICML", "控制框架。"],
    ["Alignment Faking in Large Language Models", "Greenblatt et al.", 2024, "arXiv", "伪装对齐。"],
    ["Frontier Models are Capable of In-context Scheming", "Meinke et al.", 2024, "arXiv", "谋划评估。"],
    ["Emergent Misalignment: Narrow finetuning can produce broadly misaligned LLMs", "Betley et al.", 2025, "ICML", "涌现失准。"],
    ["Constitutional Classifiers: Defending against Universal Jailbreaks across Thousands of Hours of Red Teaming", "Sharma et al.", 2025, "arXiv", "系统级防御。"]
  ]
}
);
