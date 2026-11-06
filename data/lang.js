(window.RA_DOMAINS = window.RA_DOMAINS || []).push(
{
  id: "06", name: "大模型", en: "Large Language Models", branch: "lang",
  tagline: "预训练给知识，后训练给能力，强化学习给推理。最热也最卷的领域——学术界的机会在“小而准”的科学问题上。",
  meters: [3, 5, 5, 5],
  leaves: ["Transformer 与序列建模", "预训练数据工程", "Scaling Law", "MoE 混合专家", "RoPE 与长上下文", "SFT / 指令微调", "RLHF / DPO", "GRPO / RLVR 推理强化", "测试时计算", "KV Cache / 量化 / 高效推理", "蒸馏与小模型", "扩散语言模型"],
  keywords: ["LLM", "GPT", "RLHF", "GRPO", "DeepSeek", "推理", "reasoning"],
  overview: [
    "大语言模型的生命周期分三段：<b>预训练</b>（在万亿 token 上做下一个词预测，获得知识与语言能力）、<b>后训练</b>（SFT + 偏好对齐，让它听话、有用、安全）、<b>推理强化</b>（2024 年 o1、2025 年 DeepSeek-R1 证明：在可验证奖励上做 RL，模型会自己学会长链式思考）。",
    "规模化的经验规律（Kaplan、Chinchilla Scaling Law）决定了资源分配：模型参数与数据量应大致同比例增长。架构上 Transformer + RoPE + RMSNorm + SwiGLU + 细粒度 MoE 已是行业默认；数据质量（FineWeb、DCLM 的过滤与去重）对最终能力的影响常常大于架构改动。",
    "学术界无法与工业界拼预训练规模，但在这些地方有真正的话语权：<b>RL 算法与理论</b>（GRPO 的各种修正、奖励设计）、<b>推理行为的科学</b>（RL 到底教会了什么）、<b>数据与评测</b>、<b>高效推理与压缩</b>、<b>小模型上的受控实验</b>。开源权重（Qwen、DeepSeek、Llama）与框架（verl、OpenRLHF）让 1.5B–7B 规模的后训练研究变得可行。"
  ],
  frontier: [
    ["可验证奖励强化学习（RLVR）", "GRPO 及其变体（DAPO、Dr.GRPO 等）在数学、代码上训练推理；研究焦点包括熵坍塌、长度偏差、优势估计、过程奖励与开放域奖励。"],
    ["测试时计算扩展", "更长思考、并行采样 + 投票/验证器、自我修正；如何高效分配推理算力（自适应思考长度）。"],
    ["长上下文与高效架构", "百万 token 上下文、混合线性注意力、KV cache 压缩、稀疏注意力（NSA 等）。"],
    ["数据工程与合成数据", "预训练数据筛选、配比与课程；用强模型生成推理数据蒸馏小模型；合成数据的模型坍塌风险。"],
    ["智能体式后训练", "在工具调用、代码执行、搜索环境中做多轮 RL（与 09 交叉），是 2025–2026 的主线。"]
  ],
  ideas: [
    ["RL 到底教会了模型什么？", "已有工作发现 RLVR 主要提高 pass@1 而大 k 时的 pass@k 未必超过基座——“RL 是在发现还是在挑选能力”是核心科学问题，用 1.5B 模型即可研究。", "在 Qwen2.5-Math-1.5B 上用 verl 跑 GRPO，追踪训练前后在每道题上的 pass@k 变化，把题目按“新解出/本就能解”分类分析。"],
    ["合成任务上的推理科学", "用可控难度的合成任务（图搜索、算术、逻辑谜题）研究长度泛化、思维链结构、RL 的学习动力学，结论干净、算力低。", "构造难度可调的谜题生成器，从零训练 50M–300M 的小模型，测量 SFT vs RL 下的长度/组合泛化。"],
    ["开放域可验证奖励", "RLVR 局限在数学和代码，因为只有它们好验证。为写作、科研、医学问答找到可靠、难以被 hack 的奖励信号，是下一阶段的瓶颈问题。", "选一个半开放领域（如带参考答案的医学问答），比较规则奖励、LLM-judge、rubric 奖励的被 hack 速度与最终人评质量。"]
  ],
  prereq: {
    must: ["02 深度学习基础；能手写 Transformer 与 KV cache", "分词（BPE）、预训练目标、困惑度", "SFT、RLHF（PPO）、DPO、GRPO 的目标函数与区别", "HuggingFace Transformers / TRL、vLLM 推理", "评测方法（23）：数据污染、方差、pass@k"],
    nice: ["分布式训练 FSDP/DeepSpeed/Megatron（22）", "强化学习基础（10）", "CUDA/Triton 与推理优化"]
  },
  setup: {
    data: "预训练：FineWeb（约 15T token）、DCLM；研究级小模型用 10–100B token。后训练：Tulu 3、OpenR1-Math、DeepScaleR、NuminaMath 等开源数据；评测集 GSM8K、MATH-500、AIME、GPQA、LiveCodeBench、MMLU-Pro。",
    compute: "1.5B 模型 GRPO：单机 8×A100/H100，一到几天；7B：8–32 卡；1B 模型 100B token 预训练约需数十 H100·天。只有 1–2 张卡也能做 LoRA 微调、推理分析、小模型合成任务研究。",
    code: "verl、OpenRLHF、TRL、LLaMA-Factory、Megatron-LM / TorchTitan、vLLM / SGLang、lm-evaluation-harness。",
    bench: "准确率与 pass@k（数学/代码）、AIME、GPQA、SWE-bench、人类偏好胜率、Chatbot Arena；预训练看 loss 与下游少样本。",
    improve: "RL 目标（裁剪、KL、优势归一化）、奖励设计、数据配比与筛选、课程、推理长度控制、架构效率、量化与推理加速。",
    venue: "NeurIPS / ICLR / ICML / ACL / EMNLP / COLM；大量工作以 arXiv + 开源先发"
  },
  recipe: ["选开源基座（Qwen / Llama）与开源训练框架", "在小规模（0.5–1.5B）上快速迭代想法", "扩展到 7B 验证，报告多基准 + 多种子（RL 方差很大）", "检查数据污染、与同算力基线对比", "开源代码与权重——这个领域开源几乎是必须"],
  fit: {
    yes: ["想进入当前 AI 最核心的赛道", "有一定算力（至少 8 卡）或很擅长设计小规模受控实验", "能接受极快的节奏和随时被“撞车”"],
    no: ["只有一张卡又只想做 SOTA 方法", "受不了评测噪声和大厂碾压"]
  },
  trial: [
    ["Day 1–3", "看 Karpathy 的 Let's build GPT 与 CS336 前几讲；用 vLLM 跑 Qwen2.5-1.5B，在 GSM8K 上测 pass@1 与 pass@8。"],
    ["Day 4–7", "用 TRL 或 verl 在 GSM8K 上跑一次 GRPO（0.5B 模型、单卡也可），看奖励曲线与输出长度变化。"],
    ["Day 8–11", "复现一个 GRPO 变体的改动（如去掉长度归一化），比较差异是否超过种子方差。"],
    ["Day 12–14", "读 DeepSeek-R1 与 “Does RL really incentivize...”，写下你最想回答的一个问题。"]
  ],
  classic: [
    ["Attention Is All You Need", "Vaswani et al.", 2017, "NeurIPS", "一切的基础。"],
    ["BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding", "Devlin et al.", 2019, "NAACL", "预训练-微调范式。"],
    ["Language Models are Few-Shot Learners", "Brown et al.", 2020, "NeurIPS", "GPT-3 与上下文学习。"],
    ["Scaling Laws for Neural Language Models", "Kaplan et al.", 2020, "arXiv", "规模化规律。"],
    ["Training Compute-Optimal Large Language Models", "Hoffmann et al.", 2022, "NeurIPS", "Chinchilla。"],
    ["Training language models to follow instructions with human feedback", "Ouyang et al.", 2022, "NeurIPS", "InstructGPT / RLHF。"],
    ["Chain-of-Thought Prompting Elicits Reasoning in Large Language Models", "Wei et al.", 2022, "NeurIPS", "思维链。"],
    ["Direct Preference Optimization: Your Language Model is Secretly a Reward Model", "Rafailov et al.", 2023, "NeurIPS", "DPO。"],
    ["RoFormer: Enhanced Transformer with Rotary Position Embedding", "Su et al.", 2021, "arXiv", "RoPE。"]
  ],
  recent: [
    ["DeepSeekMath: Pushing the Limits of Mathematical Reasoning in Open Language Models", "Shao et al.", 2024, "arXiv", "提出 GRPO。"],
    ["DeepSeek-V3 Technical Report", "DeepSeek-AI", 2024, "arXiv", "MoE + FP8 + MLA 的工业范本。"],
    ["DeepSeek-R1: Incentivizing Reasoning Capability in LLMs via Reinforcement Learning", "DeepSeek-AI", 2025, "arXiv / Nature", "纯 RL 涌现长推理。"],
    ["DAPO: An Open-Source LLM Reinforcement Learning System at Scale", "Yu et al.", 2025, "arXiv", "GRPO 的工程修正合集。"],
    ["Does Reinforcement Learning Really Incentivize Reasoning Capacity in LLMs Beyond the Base Model?", "Yue et al.", 2025, "arXiv", "RL 能力边界的关键质疑。"],
    ["s1: Simple test-time scaling", "Muennighoff et al.", 2025, "arXiv", "极简测试时扩展。"],
    ["The FineWeb Datasets: Decanting the Web for the Finest Text Data at Scale", "Penedo et al.", 2024, "NeurIPS D&B", "预训练数据工程。"]
  ]
},
{
  id: "07", name: "多模态", en: "Multimodal Learning", branch: "lang",
  tagline: "让语言模型长出眼睛和耳朵。连接器时代快结束了，下一步是原生统一、空间推理、和“用图像思考”。",
  meters: [3, 4, 5, 5],
  leaves: ["CLIP / 对比对齐", "图文数据集", "VLM 结构与连接器", "视觉 token 压缩 / 高分辨率", "Grounding 定位", "视频理解", "统一理解与生成", "语音 / 音频-语言", "多模态幻觉", "多模态推理", "空间智能"],
  keywords: ["VLM", "MLLM", "LLaVA", "CLIP", "Qwen-VL", "视觉语言"],
  overview: [
    "多模态学习经历了两步：<b>对齐</b>（CLIP 用 4 亿图文对做对比学习，得到共享的图文表征）和<b>接入 LLM</b>（Flamingo、BLIP-2、LLaVA 把视觉编码器通过连接器接到语言模型上，用指令数据微调）。LLaVA 式“ViT + MLP 投影 + LLM”的简单结构至今仍是学术界的主力基线。",
    "2024–2025 年，工业界开源 VLM（Qwen2.5-VL、InternVL）在动态分辨率、视频、文档理解、定位上大幅领先；研究焦点转向：<b>视觉 token 效率</b>、<b>空间与 3D 推理</b>（模型“看得见但不懂空间”）、<b>幻觉</b>、<b>多模态 RL 推理</b>（thinking with images），以及<b>理解与生成的统一模型</b>（Chameleon、Transfusion、BAGEL）。",
    "多模态也是通往具身智能的桥梁：VLA（21）几乎都以 VLM 为骨干，所以 VLM 的空间理解、时序理解缺陷会直接传导到机器人上。"
  ],
  frontier: [
    ["统一理解与生成", "单个模型同时做理解和图像生成（自回归 + 扩散混合，如 Transfusion、BAGEL）；两种能力是否相互促进仍存争议。"],
    ["多模态推理 RL", "把 RLVR 搬到视觉数学、图表、几何题；“用图像思考”（裁剪、放大、画辅助线作为推理步骤）。"],
    ["空间智能", "VSI-Bench 等显示 MLLM 在距离、方位、计数、路径规划上远逊于人类；3D 输入、空间数据合成是热点。"],
    ["视觉 token 压缩", "高分辨率与长视频产生海量 token；剪枝、合并、动态分辨率与 KV 压缩。"],
    ["全模态（Omni）", "语音输入输出、实时对话、音视频联合理解。"]
  ],
  ideas: [
    ["诊断 VLM 的视觉信息到底用没用上", "大量 VLM 基准可以“不看图”答对（语言先验）。系统量化每个基准、每类问题对视觉的真实依赖，是重新校准领域进展的基础工作。", "对 5 个主流基准做“去图/打乱图/模糊图”消融，统计各模型准确率下降，构建“视觉必需”子集。"],
    ["空间推理的数据瓶颈", "空间能力差可能是数据问题而非架构问题。用仿真/3D 数据自动生成空间问答，验证是否能低成本补上。", "从 ScanNet 或 Habitat 场景自动生成距离/方位/相对位置问答 5 万条，LoRA 微调 7B VLM，测 VSI-Bench。"],
    ["幻觉的因果来源与训练期修复", "推理期修补（对比解码等）治标；找到训练数据/对齐阶段哪一步引入了幻觉，才治本。", "在 LLaVA 训练流程中逐阶段替换数据（去掉长描述数据等），测 POPE/CHAIR 变化，定位来源。"]
  ],
  prereq: {
    must: ["02、06 的基础；Transformer 与 LLM 微调", "ViT 与 CLIP 原理（对比损失、零样本分类）", "LLaVA 架构与两阶段训练流程（对齐预训练 + 指令微调）", "LoRA / 全参微调，DeepSpeed ZeRO 基本用法", "多模态评测工具（VLMEvalKit / lmms-eval）"],
    nice: ["03 视觉基础与 3D 几何", "05 生成模型（做统一模型需要）", "音频处理（Whisper、梅尔频谱）"]
  },
  setup: {
    data: "预训练对齐：LAION / DataComp / CC3M 子集、ShareGPT4V；指令：LLaVA-665K、Cambrian-7M；评测：MMMU、MMBench、MathVista、ChartQA、Video-MME、POPE、VSI-Bench。",
    compute: "LLaVA-1.5-7B 全流程约 8×A100 一天；基于开源 VLM 的 LoRA 微调 1–4 卡可行；统一生成模型训练需要数十卡以上。",
    code: "LLaVA / LLaVA-NeXT、LLaMA-Factory、ms-swift、Qwen2.5-VL 官方、VLMEvalKit、lmms-eval。",
    bench: "各基准准确率；幻觉 POPE / CHAIR；视频 Video-MME；生成 GenEval；人类偏好。",
    improve: "视觉编码器与连接器、数据配方与合成数据、token 压缩、训练阶段设计、RL 推理、幻觉缓解、新能力基准。",
    venue: "CVPR / ICCV / ECCV / NeurIPS / ICLR / ACL / EMNLP"
  },
  recipe: ["选基座（LLaVA 用于可控研究；Qwen2.5-VL 用于强基线）", "定义能力缺口，最好配一个新基准或诊断集", "数据或训练改进 → 小规模验证", "在 10+ 基准上评测，确保没有在别处退化", "开源数据与模型"],
  fit: {
    yes: ["对视觉和语言都有兴趣", "擅长构造数据与评测", "想贴近应用（文档、图表、视频分析）"],
    no: ["算力少且只想刷总榜", "不想做大量数据工作"]
  },
  trial: [
    ["Day 1–3", "读 CLIP、LLaVA；用 Qwen2.5-VL 推理 20 道你自己出的空间/计数题，记录错误。"],
    ["Day 4–7", "跑通 LLaVA 在小数据上的 LoRA 微调与 VLMEvalKit 评测。"],
    ["Day 8–11", "做“去图测试”：在 2 个基准上去掉图像，看模型还能答对多少。"],
    ["Day 12–14", "根据观察写一个能力缺口描述 + 一个最小数据方案，判断是否值得做。"]
  ],
  classic: [
    ["Learning Transferable Visual Models From Natural Language Supervision", "Radford et al.", 2021, "ICML", "CLIP。"],
    ["Flamingo: a Visual Language Model for Few-Shot Learning", "Alayrac et al.", 2022, "NeurIPS", "冻结 LLM + 交叉注意力。"],
    ["BLIP-2: Bootstrapping Language-Image Pre-training with Frozen Image Encoders and Large Language Models", "Li et al.", 2023, "ICML", "Q-Former。"],
    ["Visual Instruction Tuning", "Liu et al.", 2023, "NeurIPS", "LLaVA。"],
    ["Improved Baselines with Visual Instruction Tuning", "Liu et al.", 2024, "CVPR", "LLaVA-1.5，最常用基线。"],
    ["Sigmoid Loss for Language Image Pre-Training", "Zhai et al.", 2023, "ICCV", "SigLIP，当前主流视觉编码器。"],
    ["Robust Speech Recognition via Large-Scale Weak Supervision", "Radford et al.", 2023, "ICML", "Whisper。"]
  ],
  recent: [
    ["Cambrian-1: A Fully Open, Vision-Centric Exploration of Multimodal LLMs", "Tong et al.", 2024, "NeurIPS", "视觉侧设计的系统研究。"],
    ["Chameleon: Mixed-Modal Early-Fusion Foundation Models", "Chameleon Team (Meta)", 2024, "arXiv", "早融合统一模型。"],
    ["Transfusion: Predict the Next Token and Diffuse Images with One Multi-Modal Model", "Zhou et al.", 2025, "ICLR", "自回归 + 扩散统一。"],
    ["Qwen2.5-VL Technical Report", "Qwen Team", 2025, "arXiv", "开源最强 VLM 之一。"],
    ["Thinking in Space: How Multimodal Large Language Models See, Remember, and Recall Spaces", "Yang et al.", 2025, "CVPR", "空间智能基准 VSI-Bench。"],
    ["Emerging Properties in Unified Multimodal Pretraining", "Deng et al.", 2025, "arXiv", "BAGEL。"]
  ]
}
);
