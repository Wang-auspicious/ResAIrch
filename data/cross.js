(window.RA_DOMAINS = window.RA_DOMAINS || []).push(
{
  id: "24", name: "医学影像 AI", en: "Medical Image Analysis", branch: "cross",
  tagline: "数据小、标注贵、错误代价高。在这里，严谨比新颖更稀缺：一个调好的 nnU-Net 打败了大多数“新架构”。",
  meters: [2, 2, 5, 4],
  leaves: ["分割 U-Net / nnU-Net", "分类与检测", "图像配准", "重建 MRI / CT", "医学基础模型 MedSAM", "交互式 3D 分割", "半监督 / 弱监督", "域泛化 / 多中心", "不确定性与校准", "病理全切片 WSI", "报告生成 / 医学 VLM", "临床验证与公平性"],
  keywords: ["medical", "医学", "segmentation", "分割", "nnU-Net", "MICCAI", "病理", "CT", "MRI"],
  overview: [
    "医学影像 AI 覆盖 CT、MRI、X 光、超声、病理切片、眼底、内镜等模态，核心任务是<b>分割</b>（器官、病灶）、<b>分类/检测</b>（良恶性、筛查）、<b>配准</b>（多时相/多模态对齐）与<b>重建</b>（低剂量 CT、加速 MRI）。与自然图像不同：数据常是 <b>3D 体数据</b>，各向异性体素间距；公开数据集多为<b>几十到几千例</b>；标注需要专家，噪声和标注者差异大；要考虑<b>多中心域偏移</b>与<b>临床可用性</b>。",
    "<b>U-Net（2015）</b>定义了这个领域；<b>nnU-Net（2021, Nature Methods）</b>把预处理、网络配置、训练与后处理自动化，在几十个挑战赛中胜出。2024 年的 <b>nnU-Net Revisited</b> 系统表明：很多 Transformer/Mamba 新架构在公平比较下并不优于调好的 CNN U-Net（尤其是 ResEnc 变体）。这是理解该领域最重要的一课：<b>基线要强、验证要严</b>。",
    "当前格局：<b>基础模型</b>快速进入——MedSAM（2D 提示分割）、TotalSegmentator（CT 100+ 结构自动分割）、VISTA3D / nnInteractive（3D 交互分割）、病理基础模型 UNI、CONCH、Prov-GigaPath，以及医学 VLM（MedGemma 等）。学术研究的价值点正从“改网络结构”转向<b>标注效率、可靠性（不确定性、校准、捷径学习）、多模态与纵向数据、以及真实临床验证</b>。"
  ],
  frontier: [
    ["3D 交互式分割基础模型", "nnInteractive、VISTA3D、SAM-Med3D：点/框/涂鸦提示下的 3D 分割，目标是成为标注与临床工具的底座。"],
    ["病理基础模型", "UNI、CONCH、Virchow、Prov-GigaPath 等在数十万张全切片上自监督训练；切片级（slide-level）表示与多实例学习是热点。"],
    ["医学多模态大模型", "LLaVA-Med、MedGemma 等；放射报告生成与其评测（临床正确性而非 BLEU）。"],
    ["严格验证运动", "Metrics Reloaded（指标选择指南）、nnU-Net Revisited；评审越来越看重强基线、多数据集与外部验证。"],
    ["可靠性与公平性", "不确定性估计、选择性预测、捷径学习（医院标记、设备差异）、子群体性能差异。"]
  ],
  ideas: [
    ["用严格协议重审一个热门结论", "领域里大量“新模块 +1–2% Dice”在 nnU-Net 级基线下站不住。用 nnU-Net Revisited 的协议（同预处理、同训练预算、多数据集、配对检验）去审视一个热门方向（如某类注意力/Mamba 分割网络），结论无论正负都有价值，且评审认可度高。", "选 3 个公开数据集（如 AMOS、KiTS23、ACDC），在 nnU-Net 框架内实现目标模块，5 折交叉验证，报告 Dice/NSD 与配对 Wilcoxon 检验。"],
    ["捷径学习与混杂因素审计", "模型可能在“看医院”而不是“看病灶”（扫描仪型号、标记、裁剪方式）。揭示并量化这些捷径，对临床安全意义重大，且不需要大算力。", "在多中心数据上训练分类/分割模型，做反事实测试（遮挡病灶、交换中心特征），测性能与中心标签可预测性；尝试去混杂训练。"],
    ["“有用的不确定性”：拒判 + 人机协作的端到端收益", "大多数不确定性论文只报 AUROC/ECE。真正的问题是：把不确定的病例交给医生后，整体工作量与准确率如何变化？定义并度量这个端到端收益，非常贴近临床。", "在分割任务上用集成/测试时增广估计不确定性，模拟“前 k% 不确定病例由专家修正”，画出工作量-整体 Dice 曲线，比较不同不确定性方法。"],
    ["基础模型在小结构与罕见病灶上的高效适配", "MedSAM/TotalSegmentator 在大器官上很好，但在小病灶、细长结构（血管、神经）与罕见病上系统性失败。少样本、低算力的适配方法需求明确。", "选一个小结构任务（如冠状动脉斑块或小肿瘤），比较零样本、LoRA/adapter 微调、nnU-Net 从头训练在 10/50/全部样本下的表现。"]
  ],
  prereq: {
    must: ["02 深度学习基础与 PyTorch", "CNN 与 U-Net 系列架构（2D/3D 卷积、编码-解码、跳连、深监督）", "医学影像基础：DICOM / NIfTI 格式、体素间距与重采样、CT 的 HU 值与窗宽窗位、MRI 序列差异", "分割指标：Dice、HD95、NSD（表面 Dice），以及它们各自的偏好（参见 Metrics Reloaded）", "数据划分：按病人划分、交叉验证、外部测试集——防止泄漏", "会用 nnU-Net v2 与 MONAI；能用 3D Slicer / ITK-SNAP 看图和改标注"],
    nice: ["基础解剖学与成像物理", "统计：配对检验、置信区间、多重比较", "与临床医生沟通的能力（定义临床有意义的问题）", "半监督/域泛化方法（mean teacher、伪标签）", "病理图像的多实例学习（MIL）"]
  },
  setup: {
    data: "3D 分割：MSD（10 个任务）、BTCV（30 例腹部 CT 训练）、AMOS（CT + MRI 共 600 例）、KiTS23（约 500 例肾肿瘤 CT）、BraTS（脑胶质瘤，2021 年约 1250 例 MRI）、ACDC（100 例心脏 MRI 训练）、TotalSegmentator 数据集（1000+ 例 CT）。2D：ISIC 2018（约 2600 张皮肤镜）、Kvasir-SEG（1000 张内镜）。病理：CAMELYON16（400 张 WSI）、TCGA。典型规模：<b>几十到几百例 3D 体数据</b>。",
    compute: "nnU-Net 3D full-res：单张 24GB 显存（RTX 3090/4090、A5000）即可；单折训练约十几小时到一两天，5 折交叉验证 × 多个配置约需一周 GPU 时间。2D 任务单卡数小时。训练医学基础模型需要数十张以上 A100/H100。",
    code: "nnU-Net v2（必备基线）、MONAI、TorchIO、SimpleITK / nibabel、MedSAM、TotalSegmentator、nnInteractive；病理用 CLAM、TRIDENT 等。",
    bench: "分割：Dice、HD95、NSD；分类：AUROC、敏感度/特异度；检测：FROC。越来越要求：多数据集、外部验证、统计检验；MICCAI 挑战赛与 grand-challenge.org 排行榜。",
    improve: "常见改进点：网络模块（注意力、Transformer、Mamba——慎重，需强基线）、损失函数（边界、拓扑、不平衡）、半监督与弱监督（伪标签、一致性正则）、域泛化与适配、形状/解剖先验、基础模型适配（adapter、提示）、后处理、不确定性。",
    venue: "MICCAI、IPMI、MIDL、ISBI；期刊 Medical Image Analysis、IEEE TMI；CVPR/ICCV 医学相关；顶刊 Nature Methods / Nature Medicine / Radiology（临床影响大的工作）"
  },
  recipe: ["选 2–3 个公开数据集，固定官方或 5 折划分", "跑 nnU-Net（及 ResEnc 变体）作为必备基线——许多论文止步于此就已失败", "针对一个具体失败模式（小病灶漏检、边界不准、跨中心掉点）设计方法", "完整评测：Dice + 表面指标、配对统计检验、外部数据集", "失败案例可视化与临床意义讨论；开源代码与模型"],
  fit: {
    yes: ["希望工作有明确的临床/社会价值", "算力有限（单卡也能做有意义的工作）", "能接受数据清洗、格式转换和与医生沟通", "喜欢看图、对细节敏感"],
    no: ["想做纯方法与大规模 scaling", "讨厌处理数据与标注的脏活", "不愿意接受“强基线下你的改进可能不显著”的现实"]
  },
  trial: [
    ["Day 1–3", "学习 DICOM/NIfTI、HU 值与重采样；用 3D Slicer 打开一个 CT，看器官与标注；读 U-Net 与 nnU-Net 论文。"],
    ["Day 4–7", "在一个小数据集（如 MSD Task04 海马或 ACDC）上完整跑 nnU-Net v2：数据转换 → 规划 → 训练 1 折 → 推理 → 计算 Dice/HD95。"],
    ["Day 8–11", "试一个改动（损失函数或数据增强）或一个基础模型（MedSAM/nnInteractive 零样本），与 nnU-Net 对比，算置信区间。"],
    ["Day 12–14", "读 nnU-Net Revisited 与 Metrics Reloaded，回头检查你的实验是否满足它们的要求；写下一个“临床上真正有用”的问题。"]
  ],
  classic: [
    ["U-Net: Convolutional Networks for Biomedical Image Segmentation", "Ronneberger, Fischer, Brox", 2015, "MICCAI", "领域奠基。"],
    ["3D U-Net: Learning Dense Volumetric Segmentation from Sparse Annotation", "Çiçek et al.", 2016, "MICCAI", "3D 扩展。"],
    ["V-Net: Fully Convolutional Neural Networks for Volumetric Medical Image Segmentation", "Milletari, Navab, Ahmadi", 2016, "3DV", "Dice 损失。"],
    ["Mean teachers are better role models: Weight-averaged consistency targets improve semi-supervised deep learning results", "Tarvainen, Valpola", 2017, "NeurIPS", "医学半监督最常用框架的基础。"],
    ["Dermatologist-level classification of skin cancer with deep neural networks", "Esteva et al.", 2017, "Nature", "医学 AI 里程碑。"],
    ["VoxelMorph: A Learning Framework for Deformable Medical Image Registration", "Balakrishnan et al.", 2019, "IEEE TMI", "学习式配准。"],
    ["nnU-Net: a self-configuring method for deep learning-based biomedical image segmentation", "Isensee et al.", 2021, "Nature Methods", "必读必用的基线。"],
    ["TransUNet: Transformers Make Strong Encoders for Medical Image Segmentation", "Chen et al.", 2021, "arXiv", "Transformer 进入医学分割。"],
    ["Metrics reloaded: recommendations for image analysis validation", "Maier-Hein et al.", 2024, "Nature Methods", "指标选择指南。"]
  ],
  recent: [
    ["TotalSegmentator: Robust Segmentation of 104 Anatomic Structures in CT Images", "Wasserthal et al.", 2023, "Radiology: AI", "开箱即用 CT 全身分割。"],
    ["Segment anything in medical images", "Ma et al.", 2024, "Nature Communications", "MedSAM。"],
    ["nnU-Net Revisited: A Call for Rigorous Validation in 3D Medical Image Segmentation", "Isensee et al.", 2024, "MICCAI", "严格验证的标杆。"],
    ["Towards a general-purpose foundation model for computational pathology", "Chen et al.", 2024, "Nature Medicine", "UNI 病理基础模型。"],
    ["A whole-slide foundation model for digital pathology from real-world data", "Xu et al.", 2024, "Nature", "Prov-GigaPath。"],
    ["U-Mamba: Enhancing Long-range Dependency for Biomedical Image Segmentation", "Ma, Li, Wang", 2024, "arXiv", "Mamba 分割代表（注意对照 Revisited 的结论）。"],
    ["nnInteractive: Redefining 3D Promptable Segmentation", "Isensee et al.", 2025, "arXiv", "3D 交互分割。"],
    ["MedGemma Technical Report", "Google", 2025, "arXiv", "开源医学多模态模型。"]
  ]
},
{
  id: "25", name: "AI for Science", en: "AI for Science", branch: "cross",
  tagline: "用 AI 加速科学发现：蛋白质、分子、材料、气象、方程。最终标准不是 benchmark，而是实验室里的验证。",
  meters: [4, 3, 3, 4],
  leaves: ["蛋白质结构预测", "蛋白质设计与生成", "分子生成与性质预测", "材料发现", "机器学习力场 MLIP", "气象预报", "PDE 求解与神经算子", "物理信息网络 PINN", "等变神经网络", "单细胞与基因组", "科学大模型与 AI 科学家"],
  keywords: ["AlphaFold", "protein", "蛋白质", "分子", "材料", "气象", "PDE", "science"],
  overview: [
    "AI for Science 把机器学习用于科学问题。里程碑是 <b>AlphaFold 2（2021）</b>解决了蛋白质结构预测，获 2024 年诺贝尔化学奖；AlphaFold 3 扩展到蛋白质-核酸-小分子复合物；RFdiffusion 用扩散模型从头设计蛋白质；ESM3 用语言模型生成新蛋白。",
    "其他方向同样活跃：<b>气象</b>（GraphCast、GenCast 在中期预报上超越传统数值预报）、<b>材料与化学</b>（通用机器学习力场如 MACE-MP-0，让分子动力学既快又准）、<b>PDE 求解</b>（FNO 等神经算子、PINN）、<b>单细胞与基因组</b>（“虚拟细胞”），以及 2025 年兴起的<b>AI 科学家/科研智能体</b>。",
    "这个领域的技术主线是<b>几何与对称性</b>（等变网络）、<b>生成模型</b>（扩散、流匹配用于分子与蛋白质）和<b>大规模预训练</b>。最大挑战是<b>验证</b>：数据泄漏（序列相似性）、分布外泛化、与湿实验闭环。"
  ],
  frontier: [
    ["生物分子结构与设计", "AlphaFold 3、RFdiffusion、ESM3；复合物、抗体与酶设计。"],
    ["通用原子间势", "MACE-MP-0 等基础力场，覆盖元素周期表的大部分。"],
    ["ML 天气与气候", "GraphCast、GenCast 的概率预报；区域预报与极端事件。"],
    ["神经算子与科学计算", "跨分辨率泛化、复杂几何、与传统求解器混合。"],
    ["AI 科学家", "提出假设、设计实验、分析结果的智能体（AI co-scientist 等）。"]
  ],
  ideas: [
    ["诚实的泛化基准", "很多结果因训练/测试的序列或结构相似而虚高。按相似度严格划分后重评主流模型，能纠正领域认知。", "在一个蛋白质或分子性质任务上按序列/骨架相似度分层划分，重测 3–5 个模型，报告性能随相似度的衰减。"],
    ["不确定性驱动的主动实验", "实验昂贵，模型应该告诉科学家“下一个测什么”。可靠的不确定性 + 主动学习是真正加速科学的关键。", "在公开分子性质数据集上模拟主动学习循环，比较不同不确定性方法达到目标精度所需的“实验”次数。"],
    ["神经算子的分布外泛化", "神经算子在训练分布内很快很准，换个边界条件或参数就失败。理解并改进它决定了能否替代传统求解器。", "在 PDEBench 上系统改变参数/几何，绘制 FNO 等模型的 OOD 误差曲线，尝试物理约束或混合求解器。"]
  ],
  prereq: {
    must: ["02 深度学习基础与 05 生成模型", "图神经网络与等变网络（E(3) 等变性）", "至少一个科学领域的基础知识（生物化学、物理、气象之一）", "PyTorch Geometric 或 e3nn 的使用", "与领域专家合作的意愿"],
    nice: ["分子动力学与量子化学基础", "数值 PDE 方法", "生物信息学工具（序列比对、PDB 格式）"]
  },
  setup: {
    data: "PDB（约 20 万+ 结构）、UniProt；QM9（约 13.4 万分子）、OC20、Materials Project；ERA5 再分析数据（1979 年至今）；MD17；PDEBench。",
    compute: "性质预测/PINN/神经算子单卡；结构预测与大模型数十到数百卡；气象模型训练需大量 GPU 与存储。",
    code: "PyTorch Geometric、e3nn、DeepXDE、neuraloperator、OpenFold、ESM、MACE、GraphCast 开源代码。",
    bench: "结构：RMSD、TM-score、lDDT；分子：MAE、对接成功率；气象：RMSE、ACC、CRPS；PDE：相对 L2 误差；最终标准：实验验证。",
    improve: "对称性与几何先验、生成模型设计、数据划分与评测、不确定性、与物理模型/实验的结合。",
    venue: "NeurIPS / ICML / ICLR（含 AI4Science workshop）；Nature / Science 系列；领域期刊"
  },
  recipe: ["和领域专家确定一个真实科学问题", "选数据与严格的划分方式", "设计融入领域知识的模型", "与传统方法和 ML 基线比较", "争取实验或真实场景验证"],
  fit: {
    yes: ["有理科背景或对某门科学有热情", "希望工作有长远科学影响", "愿意学习新领域语言"],
    no: ["只想做通用 AI 方法", "不愿意花时间理解另一门学科"]
  },
  trial: [
    ["Day 1–3", "读 AlphaFold 2 论文与综述；用 ColabFold 预测一个蛋白结构并在 PyMOL 中查看。"],
    ["Day 4–7", "在 QM9 上训练一个等变 GNN 预测分子性质。"],
    ["Day 8–11", "跑 FNO 解一个简单 PDE（Burgers / Darcy），测分辨率泛化。"],
    ["Day 12–14", "选一个你最感兴趣的科学方向，找一位该领域的人聊 30 分钟，问他们最痛的问题。"]
  ],
  classic: [
    ["Neural Message Passing for Quantum Chemistry", "Gilmer et al.", 2017, "ICML", "MPNN。"],
    ["SchNet: A continuous-filter convolutional neural network for modeling quantum interactions", "Schütt et al.", 2017, "NeurIPS", "连续滤波卷积。"],
    ["Physics-informed neural networks: A deep learning framework for solving forward and inverse problems involving nonlinear partial differential equations", "Raissi, Perdikaris, Karniadakis", 2019, "J. Comput. Phys.", "PINN。"],
    ["Fourier Neural Operator for Parametric Partial Differential Equations", "Li et al.", 2021, "ICLR", "神经算子。"],
    ["E(n) Equivariant Graph Neural Networks", "Satorras, Hoogeboom, Welling", 2021, "ICML", "等变 GNN。"],
    ["Highly accurate protein structure prediction with AlphaFold", "Jumper et al.", 2021, "Nature", "AlphaFold 2。"],
    ["Learning skillful medium-range global weather forecasting", "Lam et al.", 2023, "Science", "GraphCast。"]
  ],
  recent: [
    ["De novo design of protein structure and function with RFdiffusion", "Watson et al.", 2023, "Nature", "扩散蛋白设计。"],
    ["A foundation model for atomistic materials chemistry", "Batatia et al.", 2023, "arXiv", "MACE-MP-0。"],
    ["Accurate structure prediction of biomolecular interactions with AlphaFold 3", "Abramson et al.", 2024, "Nature", "AlphaFold 3。"],
    ["Probabilistic weather forecasting with machine learning", "Price et al.", 2025, "Nature", "GenCast。"],
    ["Simulating 500 million years of evolution with a language model", "Hayes et al.", 2025, "Science", "ESM3。"],
    ["Towards an AI co-scientist", "Gottweis et al.", 2025, "arXiv", "科研智能体。"]
  ]
}
);
