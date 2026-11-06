(window.RA_DOMAINS = window.RA_DOMAINS || []).push(
{
  id: "01", name: "数学进阶", en: "Mathematics for AI", branch: "found",
  tagline: "不是一个方向，而是所有方向的汇率：数学越扎实，你能读懂、能动手改的论文就越多。",
  meters: [4, 1, 2, 2],
  leaves: ["线性代数与矩阵微积分", "概率与统计估计", "信息论 / KL / 互信息", "优化与收敛", "SVD / 低秩结构", "f-散度 / Wasserstein", "Fisher 信息 / 自然梯度", "SDE / Itô / Langevin", "变分推断 / ELBO", "最优传输", "高维概率与集中不等式", "深度学习理论"],
  keywords: ["theory", "理论", "NTK", "muP", "Muon"],
  overview: [
    "数学在 AI 研究里有三重身份：<b>语言</b>（读懂论文）、<b>工具</b>（推导目标函数、证明性质）、<b>透镜</b>（看出扩散 = SDE 的时间反演、注意力 = 核平滑、对比学习 = 互信息下界）。绝大多数人不需要“做数学研究”，但需要能在白板上把一篇论文的核心推导走一遍。",
    "2020 年后“够用的数学”在迁移：从凸优化 + PAC 学习，转向<b>概率与随机过程</b>（score、SDE、流匹配、最优传输）、<b>高维统计</b>与<b>为规模服务的线性代数</b>（低秩、谱、矩阵范数下的优化器）。",
    "作为研究方向，“深度学习理论”关注：训练动力学（NTK、平均场、μP 的特征学习极限）、隐式偏置与泛化、Scaling Law 的解释、In-context learning 的机制、grokking 与相变。它门槛高、产出慢，但好的理论工作会被实践者长期引用。"
  ],
  frontier: [
    ["特征学习与超参迁移（μP 家族）", "Tensor Programs / μP 让小模型上调好的学习率直接迁移到大模型；深度方向的 μP、与 Muon 等新优化器的结合是活跃主题。"],
    ["优化器的几何视角", "Shampoo、SOAP、Muon 把优化看作“在某个矩阵范数下的最速下降”。Muon 已被用于大模型预训练，为什么有效、何时失效仍缺理论。"],
    ["生成模型理论", "扩散/流模型的采样复杂度、score 估计误差如何传导到样本质量、记忆 vs 泛化（何时会复刻训练集）。"],
    ["In-context learning 与推理的机制理论", "Transformer 如何在前向传播中实现梯度下降/贝叶斯推断；链式思维为何提升表达能力（电路复杂度视角）。"],
    ["Scaling Law 的来源", "从数据分布的幂律谱、特征学习等角度解释为什么损失随算力呈幂律，以及数据配比、重复数据的影响。"]
  ],
  ideas: [
    ["把一个“玄学技巧”变成可检验的定理", "实践中有大量没人能解释的技巧（QK-norm、z-loss、Muon 的正交化、warmup 必要性）。给出简化模型下的解释 + 可验证的预测，引用面极广。", "在 2 层线性网络 / 小 Transformer 上推出预测（例如最优学习率随宽度的缩放指数），用 1 张 GPU 扫参验证曲线是否吻合。"],
    ["为一个现象构造最小可证伪的 toy model", "好的 toy model（如 Toy Models of Superposition）会成为整个子领域的公共语言。关键是“最小”：去掉一切不必要的东西后现象仍在。", "挑 grokking / attention sink / 重复数据的性能拐点之一，在合成任务上复现，画出相图（数据量 × 正则 × 宽度）。"],
    ["从“理论预测”出发设计更好的方法", "理论最有说服力的时候是它告诉你一个此前没人试过、且确实更好的配置。", "例如基于谱分析给出新的学习率调度或初始化，在 nanoGPT 124M 上做 compute-matched 对比 + 多种子。"]
  ],
  prereq: {
    must: ["线性代数：SVD、特征分解、矩阵范数、矩阵求导（能手推 softmax/LayerNorm 的梯度）", "概率论：条件期望、常见分布、Bayes、大数定律与中心极限定理", "多元微积分与优化：梯度、Hessian、凸性、拉格朗日乘子、SGD 收敛的基本论证", "信息论基础：熵、交叉熵、KL、互信息"],
    nice: ["随机过程与 SDE（Itô 公式、Fokker-Planck）", "测度论/泛函分析初步（读严谨理论论文需要）", "最优传输与 Wasserstein 几何", "Lean 等形式化证明工具"]
  },
  setup: {
    data: "合成数据为主（线性回归、奇偶校验、模加法、高斯混合）；验证外推时用 CIFAR-10 / 小型语言模型（TinyStories、OpenWebText 子集）。",
    compute: "1 张消费级 GPU 足够；很多工作是纸笔 + Colab。验证“理论在中等规模成立”时需要 4–8 卡做扫参。",
    code: "PyTorch 或 JAX（vmap 扫参非常方便）；SymPy 辅助推导；nanoGPT 用作真实模型试验台。",
    bench: "没有统一排行榜。说服力来自：理论曲线 vs 实测曲线的吻合度、预测的新现象被验证、对已有经验规律的解释力。",
    improve: "放宽假设（线性→非线性、无限宽→有限宽、梯度流→带噪 SGD）、给出更紧的界、解释新现象、把结论转成可用的超参规则。",
    venue: "NeurIPS / ICML / ICLR / COLT / ALT；JMLR、TMLR"
  },
  recipe: ["从实践中挑一个反常识现象或无人解释的技巧", "构造保留该现象的最小模型（越简单越好）", "推导：给出定量预测（标度指数、相变点、最优超参）", "在 toy 上验证预测，再到中等规模真实模型上验证是否外推", "把结论翻译成实践者能直接用的规则，写清假设边界"],
  fit: {
    yes: ["享受推导，能忍受数周没有“结果”", "对“为什么有效”比对“刷到 SOTA”更兴奋", "数学/物理背景，想用比较优势进入 AI"],
    no: ["需要快速产出论文毕业", "讨厌证明与长推导", "想做直接落地的产品型工作"]
  },
  trial: [
    ["Day 1–3", "过一遍《Mathematics for Machine Learning》的线代与概率章节；手推 MLP 的反向传播、softmax 交叉熵梯度、LayerNorm 梯度。"],
    ["Day 4–7", "精读 NTK 或 μP 论文之一，复现论文里的一张图（如不同宽度下最优学习率是否对齐）。"],
    ["Day 8–11", "在 toy 任务上复现 grokking，改一个变量（权重衰减 / 数据比例），画相图。"],
    ["Day 12–14", "写 2 页笔记：你能否对一个现象给出预测？如果写得很爽——继续；如果只想跑大实验——去 02/06。"]
  ],
  classic: [
    ["Neural Tangent Kernel: Convergence and Generalization in Neural Networks", "Jacot, Gabriel, Hongler", 2018, "NeurIPS", "无限宽网络 = 核方法，训练动力学理论的起点。"],
    ["Understanding Deep Learning Requires Rethinking Generalization", "Zhang et al.", 2017, "ICLR", "随机标签实验：经典泛化理论解释不了深度学习。"],
    ["Deep Double Descent: Where Bigger Models and More Data Hurt", "Nakkiran et al.", 2020, "ICLR", "模型/数据/训练轮数上的双下降现象。"],
    ["Score-Based Generative Modeling through Stochastic Differential Equations", "Song et al.", 2021, "ICLR", "SDE 统一扩散模型，必须掌握的随机过程应用。"],
    ["Variational Inference: A Review for Statisticians", "Blei, Kucukelbir, McAuliffe", 2017, "JASA", "变分推断最清楚的综述。"],
    ["Computational Optimal Transport", "Peyré, Cuturi", 2019, "Foundations and Trends in ML", "最优传输的计算视角入门书。"]
  ],
  recent: [
    ["Tensor Programs V: Tuning Large Neural Networks via Zero-Shot Hyperparameter Transfer", "Yang et al.", 2022, "arXiv / NeurIPS 2021", "μP：理论直接变成大模型训练实践的典范。"],
    ["Transformers Learn In-Context by Gradient Descent", "von Oswald et al.", 2023, "ICML", "ICL 的机制理论代表作。"],
    ["Grokking: Generalization Beyond Overfitting on Small Algorithmic Datasets", "Power et al.", 2022, "arXiv", "延迟泛化现象，催生大量 toy model 研究。"],
    ["Old Optimizer, New Norm: An Anthology", "Bernstein, Newhouse", 2024, "arXiv", "用范数视角统一 Adam / Shampoo / Muon。"],
    ["Muon is Scalable for LLM Training", "Liu et al. (Moonshot AI)", 2025, "arXiv", "Muon 在大规模预训练中的验证。"],
    ["SOAP: Improving and Stabilizing Shampoo using Adam", "Vyas et al.", 2025, "ICLR", "二阶优化器的实用化。"]
  ]
},
{
  id: "02", name: "深度学习基础", en: "Deep Learning Foundations", branch: "found",
  tagline: "所有方向的地基：会训练、会调试、会看 loss 曲线。这里的研究在问“训练本身还能怎样更好”。",
  meters: [2, 3, 4, 4],
  leaves: ["反向传播与损失函数", "SGD / Adam / 学习率调度", "归一化 BN / LN / RMSNorm", "残差与初始化", "正则化 / 权重衰减", "CNN / RNN / Transformer / GNN", "SSM / 线性注意力", "MoE 稀疏专家", "自监督表征", "训练稳定性 / 混合精度", "泛化与校准"],
  keywords: ["optimizer", "架构", "nanoGPT", "Mamba", "DINO"],
  overview: [
    "深度学习基础既是所有人的必修课，也是一个研究方向。作为必修课，你要能从零写训练循环、读懂 loss 曲线里的异常（发散、平台、spike）、知道每个超参大概的合理范围。",
    "作为研究方向，它经历了三个阶段：2012–2017 的“架构动物园”（ResNet、BN、Attention 层出不穷）；2018–2022 的“Transformer 统一 + 规模化”；2023 以后的“训练科学”——在 Transformer 已成默认的前提下，研究<b>优化器、学习率调度、归一化、初始化、架构效率（SSM、线性注意力、MoE）以及自监督表征</b>。",
    "这里的研究有很强的“工程实证”文化：一个改动是否有效，要在<b>调好的强基线</b>、<b>多种子</b>、<b>多规模</b>下证明。modded-nanogpt speedrun 这类公开竞赛把“同等算力下谁更快到达目标 loss”变成了硬标准。"
  ],
  frontier: [
    ["新优化器与学习率调度", "Muon（正交化更新）、Schedule-Free、WSD（warmup-stable-decay）调度让“不知道总步数也能训练”成为可能；优化器对比的公平性本身也成了研究题。"],
    ["去归一化与稳定性", "DyT（Dynamic Tanh）显示 Transformer 可以不用 LayerNorm；QK-norm、logit soft-capping 等解决大规模训练的 loss spike。"],
    ["亚二次架构与混合架构", "Mamba-2、Gated DeltaNet 等线性注意力/SSM 与全注意力混合，在长上下文效率上与 Transformer 竞争。"],
    ["细粒度 MoE", "共享专家 + 大量小专家、无辅助损失的负载均衡，已成为前沿大模型标配。"],
    ["自监督视觉表征", "DINOv2/v3 显示纯图像自监督在稠密任务上可超过图文对比学习，JEPA 系列走“预测表征而非像素”路线。"]
  ],
  ideas: [
    ["训练不稳定性的早期预警", "大模型训练最贵的事故是 loss spike 与发散。如果能从注意力 logit 增长、更新范数等信号中提前 N 步预测，价值极高且只需小模型研究。", "在 nanoGPT 上人为制造不稳定（大学习率、去掉 QK-norm），记录内部统计量，训练一个预测器，看提前量与误报率。"],
    ["小规模结论何时能外推到大规模", "很多架构改进在 100M 上有效、到 1B 消失。系统地研究“哪些类型的改进能外推”，能节省整个社区的算力。", "选 5 个已发表的小改动，在 3 个规模（20M/120M/350M）上做 compute-matched 复现，拟合收益随规模的趋势。"],
    ["在 speedrun 规则下证明一个新组件", "固定 token 预算与目标 loss，规则透明、易复现，评审很难挑刺。", "在 modded-nanogpt 当前记录上加入你的改动（初始化/归一化/数据顺序），多种子报告时间到达目标 loss 的变化。"]
  ],
  prereq: {
    must: ["01 中的线代、概率、微积分", "PyTorch 熟练：Dataset/DataLoader、autograd、手写训练循环、保存恢复", "理解反向传播与计算图，能定位 NaN、形状与设备错误", "能读 loss/梯度范数/学习率曲线并做出判断", "Transformer 的每一行代码（建议手写一遍 GPT）"],
    nice: ["混合精度与分布式训练（见 22）", "CUDA/Triton 基础", "实验管理（W&B）与严谨的多种子统计（见 23）"]
  },
  setup: {
    data: "视觉：CIFAR-10（5 万张）、ImageNet-1k（128 万张）。语言：OpenWebText、FineWeb-Edu 子集，研究级常用 1–10B tokens。",
    compute: "CIFAR 单卡分钟级；ImageNet ResNet-50 用 8 卡约一天量级；GPT-2 124M 在 8×H100 上 speedrun 已压到几分钟，单卡几小时可完成。",
    code: "nanoGPT / modded-nanogpt、timm、PyTorch 官方示例；JAX 系也常见。",
    bench: "ImageNet top-1；固定 token 数下的验证 loss/困惑度；speedrun 到达目标 loss 的墙钟时间；下游少样本评测。",
    improve: "优化器、学习率调度、归一化、初始化、注意力/MLP 变体、位置编码、数据顺序与课程。",
    venue: "ICLR / NeurIPS / ICML；TMLR；部分在博客与 GitHub speedrun 记录中先发"
  },
  recipe: ["复现一个调好的强基线（这一步最容易偷懒，也最致命）", "只改一个变量", "多种子 + 至少 3 个模型规模", "compute-matched 对比（同样 FLOPs/墙钟），而不是同样步数", "消融 + 机制解释（为什么有效）"],
  fit: {
    yes: ["喜欢干净的实验与可控变量", "享受“同样算力快 5%”这种扎实的提升", "想打下所有方向通用的基本功"],
    no: ["只有很少算力又想做大规模结论", "对调参与统计细节不耐烦"]
  },
  trial: [
    ["Day 1–3", "跟着 Karpathy 的 Zero to Hero 手写 micrograd 与 GPT；在 Shakespeare 上训练出能生成文本的小模型。"],
    ["Day 4–7", "跑通 nanoGPT 124M（或缩小版）在 OpenWebText 子集；学会看 loss、梯度范数、学习率曲线。"],
    ["Day 8–11", "做一次严格消融：比如 AdamW vs Muon，或 LN vs RMSNorm vs DyT，3 个种子、2 个规模。"],
    ["Day 12–14", "写一页结论：效果差异是否超过种子方差？如果你享受这个过程，这就是你的方向。"]
  ],
  classic: [
    ["ImageNet Classification with Deep Convolutional Neural Networks", "Krizhevsky, Sutskever, Hinton", 2012, "NeurIPS", "深度学习时代的开端。"],
    ["Deep Residual Learning for Image Recognition", "He et al.", 2016, "CVPR", "残差连接，至今每个模型都在用。"],
    ["Batch Normalization: Accelerating Deep Network Training by Reducing Internal Covariate Shift", "Ioffe, Szegedy", 2015, "ICML", "归一化的起点。"],
    ["Adam: A Method for Stochastic Optimization", "Kingma, Ba", 2015, "ICLR", "默认优化器。"],
    ["Decoupled Weight Decay Regularization", "Loshchilov, Hutter", 2019, "ICLR", "AdamW：权重衰减的正确写法。"],
    ["Attention Is All You Need", "Vaswani et al.", 2017, "NeurIPS", "Transformer。"],
    ["Dropout: A Simple Way to Prevent Neural Networks from Overfitting", "Srivastava et al.", 2014, "JMLR", "经典正则化。"]
  ],
  recent: [
    ["Transformers without Normalization", "Zhu, Chen, He, LeCun, Liu", 2025, "CVPR", "DyT 替代 LayerNorm。"],
    ["The Road Less Scheduled", "Defazio et al.", 2024, "NeurIPS", "Schedule-Free 优化。"],
    ["Mamba: Linear-Time Sequence Modeling with Selective State Spaces", "Gu, Dao", 2024, "COLM", "选择性 SSM。"],
    ["Gated Delta Networks: Improving Mamba2 with Delta Rule", "Yang, Kautz, Hatamizadeh", 2025, "ICLR", "线性注意力的前沿形态。"],
    ["DINOv2: Learning Robust Visual Features without Supervision", "Oquab et al.", 2024, "TMLR", "自监督视觉表征的基准。"],
    ["Muon is Scalable for LLM Training", "Liu et al. (Moonshot AI)", 2025, "arXiv", "新优化器的大规模验证。"]
  ]
}
);
