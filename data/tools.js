(window.RA_DOMAINS = window.RA_DOMAINS || []).push(
{
  id: "22", name: "工程与系统", en: "ML Engineering & Systems", branch: "tools",
  tagline: "同样的想法，工程好的人一周验证，工程差的人三个月。也是一个独立的研究方向：让训练与推理快 10 倍。",
  meters: [3, 3, 3, 5],
  leaves: ["GPU / CUDA / Triton", "Profiling 与性能分析", "数据加载与 I/O", "混合精度 bf16 / fp8", "分布式 DDP / FSDP / 张量并行", "推理服务 vLLM / SGLang", "torch.compile", "通信 NCCL", "实验管理 W&B", "开发环境 Docker / SSH / tmux", "调试 NaN / 形状 / 随机性", "RL 训练基础设施"],
  keywords: ["CUDA", "Triton", "分布式", "vLLM", "系统", "MLSys", "FlashAttention"],
  overview: [
    "对所有研究者来说，工程能力决定<b>迭代速度</b>：会 profile、会排查 dataloader 瓶颈、会用混合精度与 FSDP、会管理实验，才能在同样算力下多跑几倍的实验。",
    "作为研究方向（MLSys），它关注<b>训练与推理的效率</b>：IO 感知的注意力（FlashAttention 系列）、并行策略（ZeRO、Megatron 的张量/流水线并行）、低精度训练（FP8，DeepSeek-V3 已在大规模使用）、推理服务（PagedAttention / vLLM、RadixAttention / SGLang、投机解码）、以及 RL 后训练框架（verl / HybridFlow）。",
    "2025 年后一个新趋势是<b>用 LLM 写 kernel</b>（KernelBench），以及 Triton、ThunderKittens 等 DSL 降低写高性能 kernel 的门槛。理解 roofline 模型（算力受限 vs 带宽受限）是这一切的起点。"
  ],
  frontier: [
    ["注意力与 kernel 优化", "FlashAttention-3 利用 Hopper 异步特性与 FP8；各种稀疏/线性注意力 kernel。"],
    ["低精度训练", "FP8 乃至 FP4 训练的稳定性与缩放策略。"],
    ["推理系统", "PagedAttention、前缀缓存、投机解码、预填充-解码分离部署。"],
    ["RL 训练基础设施", "生成与训练的混合调度、异步 RL、长轨迹智能体 RL 的系统问题。"],
    ["LLM 辅助的 kernel 生成", "KernelBench 等评测 LLM 写正确且快的 GPU 代码。"]
  ],
  ideas: [
    ["把一个研究瓶颈做 10× 并开源", "大量研究受制于某个慢的环节（数据预处理、某种注意力变体、评测流程）。一个 10× 加速的开源工具会被成百上千篇论文使用。", "在你所在领域找到最慢的一步（如 3D 医学影像增强、点云采样），用 profile 定位，Triton/CUDA 重写，对比吞吐。"],
    ["LLM 生成 kernel 的正确性验证", "LLM 写的 kernel 常在边界条件出错或“作弊”。自动化的正确性与性能验证框架是这条路线的关键基础设施。", "在 KernelBench 子集上设计更严格的测试（随机形状、数值精度、边界值），评估现有模型生成 kernel 的真实通过率。"],
    ["训练可复现性工具", "同代码不同结果是研究的噩梦。系统梳理非确定性来源并提供检测工具，非常实用。", "构建工具记录并比较两次训练的逐层激活/梯度差异，定位首个发散点，在常见框架上验证。"]
  ],
  prereq: {
    must: ["Linux、SSH、tmux、Docker、Git 熟练", "PyTorch 内部：张量存储、autograd、CUDA stream 基本概念", "torch.profiler / Nsight 的使用", "混合精度（bf16）与梯度累积", "DDP 与 FSDP 的原理和使用"],
    nice: ["CUDA C++ 与 Triton", "计算机体系结构（CMU 15-213 / 15-418 级）", "NCCL 与网络拓扑", "CMU DLSys 课程（从零实现框架）"]
  },
  setup: {
    data: "以模型和负载为对象：标准模型（Llama、GPT-2）与真实请求轨迹（ShareGPT）。",
    compute: "kernel 优化 1 张现代 GPU（Hopper 特性需要 H100）；分布式研究需多机多卡。",
    code: "PyTorch、Triton、CUTLASS、Megatron-LM、DeepSpeed、TorchTitan、vLLM、SGLang、verl。",
    bench: "MFU（模型 FLOPs 利用率）、吞吐 tokens/s、延迟（TTFT、TPOT）、显存占用、扩展效率。",
    improve: "kernel 融合与 IO 优化、并行策略、调度、内存管理、精度格式、通信重叠。",
    venue: "MLSys / OSDI / SOSP / EuroSys / ASPLOS / SC；NeurIPS / ICML 系统类"
  },
  recipe: ["选一个有代表性的负载", "profile 定位瓶颈（算力 vs 带宽 vs 通信）", "设计优化（kernel / 调度 / 内存）", "与强系统基线比较，报告多种规模", "开源并集成到主流框架"],
  fit: {
    yes: ["喜欢底层、追求极致性能", "想在大模型公司做基础设施", "CS 系统背景"],
    no: ["对硬件与性能细节不感兴趣"]
  },
  trial: [
    ["Day 1–3", "读 Making Deep Learning Go Brrrr（He 的博客）理解 roofline；用 torch.profiler 分析你的一个训练脚本。"],
    ["Day 4–7", "跟着 Triton 官方教程写 softmax 与 matmul kernel，与 PyTorch 对比速度。"],
    ["Day 8–11", "把一个训练脚本改成 bf16 + FSDP + torch.compile，测吞吐提升。"],
    ["Day 12–14", "用 vLLM 部署一个模型，测不同 batch 下延迟与吞吐，读 PagedAttention 论文。"]
  ],
  classic: [
    ["Roofline: An Insightful Visual Performance Model for Multicore Architectures", "Williams, Waterman, Patterson", 2009, "CACM", "性能分析的基本模型。"],
    ["Mixed Precision Training", "Micikevicius et al.", 2018, "ICLR", "混合精度。"],
    ["Megatron-LM: Training Multi-Billion Parameter Language Models Using Model Parallelism", "Shoeybi et al.", 2019, "arXiv", "张量并行。"],
    ["PyTorch: An Imperative Style, High-Performance Deep Learning Library", "Paszke et al.", 2019, "NeurIPS", "PyTorch 设计。"],
    ["ZeRO: Memory Optimizations Toward Training Trillion Parameter Models", "Rajbhandari et al.", 2020, "SC", "ZeRO / FSDP 思想来源。"],
    ["FlashAttention: Fast and Memory-Efficient Exact Attention with IO-Awareness", "Dao et al.", 2022, "NeurIPS", "IO 感知注意力。"],
    ["Efficient Memory Management for Large Language Model Serving with PagedAttention", "Kwon et al.", 2023, "SOSP", "vLLM。"]
  ],
  recent: [
    ["Fast Inference from Transformers via Speculative Decoding", "Leviathan, Kalman, Matias", 2023, "ICML", "投机解码。"],
    ["FlashAttention-3: Fast and Accurate Attention with Asynchrony and Low-precision", "Shah et al.", 2024, "NeurIPS", "Hopper 优化。"],
    ["SGLang: Efficient Execution of Structured Language Model Programs", "Zheng et al.", 2024, "NeurIPS", "RadixAttention。"],
    ["TorchTitan: One-stop PyTorch native solution for production ready LLM pre-training", "Liang et al.", 2025, "ICLR", "原生大规模训练。"],
    ["HybridFlow: A Flexible and Efficient RLHF Framework", "Sheng et al.", 2025, "EuroSys", "verl。"],
    ["KernelBench: Can LLMs Write Efficient GPU Kernels?", "Ouyang et al.", 2025, "arXiv", "LLM 写 kernel 的评测。"]
  ]
},
{
  id: "23", name: "评测与实验方法", en: "Evaluation & Methodology", branch: "tools",
  tagline: "研究的免疫系统：怎么设计实验、怎么比较、怎么不骗自己。在 benchmark 快速饱和的今天，它本身就是一个越来越重要的研究方向。",
  meters: [2, 1, 2, 4],
  leaves: ["实验设计与对照", "基线公平与调参预算", "消融实验", "多种子与置信区间", "统计检验 Bootstrap", "数据污染与泄漏", "Benchmark 设计与效度", "LLM-as-Judge / Elo", "人类评估", "论文阅读与复现", "报告规范"],
  keywords: ["evaluation", "benchmark", "评测", "统计", "实验设计", "复现"],
  overview: [
    "每个领域都有过“进展被证明是假的”时刻：RL 中改个种子结论就反转；度量学习十几年的进步在公平对比下大部分消失；医学分割的新架构在调好的 nnU-Net 面前不占优；NLI 模型靠标注伪迹得分。共同原因是<b>弱基线、调参不公、单种子、测试集泄漏</b>。",
    "作为必修课，你需要掌握：<b>只改一个变量</b>的对照设计、<b>同等调参预算</b>、<b>多种子 + 置信区间</b>、<b>按样本/病人/场景划分</b>防泄漏、<b>消融</b>的正确做法、以及如何读论文时识别这些问题。",
    "作为研究方向，评测正在变得核心：LLM 基准快速饱和与污染（需要动态基准 LiveBench、更难的 HLE）、<b>LLM-as-judge 的偏差</b>、Chatbot Arena 的统计与操纵问题、小样本高效评测、智能体评测的方差，以及“基准测的是不是我们以为的能力”（效度）。"
  ],
  frontier: [
    ["污染检测与动态基准", "定期更新题目（LiveBench、LiveCodeBench），检测训练数据泄漏。"],
    ["LLM 评委的可靠性", "位置偏差、长度偏差、自我偏好；如何校准。"],
    ["评测的统计学", "为评测加误差条、配对检验、聚类标准误（Adding Error Bars to Evals）。"],
    ["排行榜的可信度", "Chatbot Arena 等的私下测试、选择性公开等问题（The Leaderboard Illusion）。"],
    ["高效评测", "用少量代表性样本估计完整基准分数（tinyBenchmarks）。"]
  ],
  ideas: [
    ["为你领域的主流基准做一次“效度审计”", "每个领域都有被过度使用、但可能测错了东西的基准。审计它（标签错误、捷径、饱和、污染）是社区最需要但最少人做的工作。", "选一个基准，人工复核 300 个样本的标签与可捷径性，测“去掉关键信息”后模型准确率，报告修正后的排名。"],
    ["评测方差来源的分解", "一个模型在某基准上的得分受采样温度、提示格式、种子、评测实现影响多大？分解后能给出最低需要的重复次数。", "对 5 个模型在 3 个基准上做因子设计实验，用方差分析分解来源，给出报告规范建议。"],
    ["重新审视一个热门结论", "用严格协议（强基线、同调参预算、多种子）复现一个被广泛引用的“X 比 Y 好”，无论结果如何都有价值。", "参照 nnU-Net Revisited 或 Musgrave 等的做法，在你的领域选一个结论重新做公平对比。"]
  ],
  prereq: {
    must: ["基本统计：均值方差、置信区间、t 检验、bootstrap", "实验设计：对照、随机化、单变量改动", "数据划分与泄漏的常见形式", "会用一个评测框架（lm-eval-harness / inspect / rliable）", "批判性阅读论文的习惯"],
    nice: ["心理测量学（效度、信度）", "因果推断", "标注流程与人类评估设计"]
  },
  setup: {
    data: "现有基准本身；人工复核样本；自建诊断集。",
    compute: "低到中：主要是多次运行评测；对大模型评测时 API 或推理成本为主。",
    code: "lm-evaluation-harness、inspect、HELM、rliable、scipy / statsmodels。",
    bench: "元评测：排名稳定性、与人类判断相关性、标签错误率、污染率。",
    improve: "评测协议、统计方法、新基准设计、污染检测方法、评委校准。",
    venue: "NeurIPS Datasets & Benchmarks、ICLR / ICML、ACL / EMNLP、TMLR"
  },
  recipe: ["提出一个关于评测可信度的具体疑问", "设计能回答它的对照实验", "大规模、多模型、多种子执行", "统计分析并给出可操作的建议", "开源工具与修正后的数据"],
  fit: {
    yes: ["较真、喜欢找漏洞", "想做“让领域更健康”的工作", "统计背景好"],
    no: ["只想提出新方法"]
  },
  trial: [
    ["Day 1–3", "读 Deep RL that Matters、Statistical Precipice、Adding Error Bars to Evals。"],
    ["Day 4–7", "在你领域的一篇论文上做复现，记录所有未说明的细节。"],
    ["Day 8–11", "对一个基准跑 5 个种子 / 3 种提示格式，算置信区间，看论文中的提升是否显著。"],
    ["Day 12–14", "写一篇“我复现 X 学到的事”博客。"]
  ],
  classic: [
    ["Deep Reinforcement Learning that Matters", "Henderson et al.", 2018, "AAAI", "RL 可复现性。"],
    ["Annotation Artifacts in Natural Language Inference Data", "Gururangan et al.", 2018, "NAACL", "标注伪迹与捷径。"],
    ["Troubling Trends in Machine Learning Scholarship", "Lipton, Steinhardt", 2018, "arXiv", "研究规范反思。"],
    ["Do ImageNet Classifiers Generalize to ImageNet?", "Recht et al.", 2019, "ICML", "测试集过拟合。"],
    ["Model Cards for Model Reporting", "Mitchell et al.", 2019, "FAT*", "报告规范。"],
    ["A Metric Learning Reality Check", "Musgrave, Belongie, Lim", 2020, "ECCV", "公平对比后进展消失。"],
    ["Deep Reinforcement Learning at the Edge of the Statistical Precipice", "Agarwal et al.", 2021, "NeurIPS", "IQM 与统计。"],
    ["Holistic Evaluation of Language Models", "Liang et al.", 2023, "TMLR", "HELM。"]
  ],
  recent: [
    ["Judging LLM-as-a-Judge with MT-Bench and Chatbot Arena", "Zheng et al.", 2023, "NeurIPS D&B", "LLM 评委。"],
    ["tinyBenchmarks: evaluating LLMs with fewer examples", "Polo et al.", 2024, "ICML", "高效评测。"],
    ["Adding Error Bars to Evals: A Statistical Approach to Language Model Evaluations", "Miller", 2024, "arXiv", "评测统计。"],
    ["LiveBench: A Challenging, Contamination-Free LLM Benchmark", "White et al.", 2025, "ICLR", "动态基准。"],
    ["Humanity's Last Exam", "Phan et al.", 2025, "arXiv", "高难度基准。"],
    ["The Leaderboard Illusion", "Singh et al.", 2025, "arXiv", "排行榜可信度。"]
  ]
}
);
