window.ACE_CONTENT = {
  "benchmarks": [
    "Where2Place",
    "PixMo-Count",
    "RoboSpatial",
    "RefSpatial",
    "PointArena",
    "RoboAfford",
    "ShareRobot",
    "Avg-7",
    "RobotGrounding"
  ],
  "models": [
    {
      "name": "Claude Opus 5.5",
      "group": "Closed",
      "scores": [
        66.44,
        83.74,
        73.3,
        71.1,
        61.2,
        75.1,
        40.2,
        67.3,
        90.89
      ]
    },
    {
      "name": "Gemini 4 Argon",
      "group": "Closed",
      "scores": [
        71.2,
        87.71,
        80.94,
        51.56,
        66.4,
        71.48,
        29.53,
        65.55,
        78.51
      ]
    },
    {
      "name": "GPT-5.5",
      "group": "Closed",
      "scores": [
        45.25,
        82.61,
        59.19,
        60.29,
        68.02,
        68.04,
        38.57,
        60.28,
        83.96
      ]
    },
    {
      "name": "GPT-5.6-sol",
      "group": "Closed",
      "scores": [
        46.23,
        83.55,
        64.34,
        54.51,
        69.76,
        71.45,
        36.66,
        60.93,
        85.18
      ]
    },
    {
      "name": "GPT-6 Astra",
      "group": "Closed",
      "scores": [
        71.1,
        88.1,
        69.55,
        80.14,
        75.36,
        84.94,
        46.6,
        73.68,
        91.1
      ]
    },
    {
      "name": "Qwen3-VL-8B",
      "group": "General-purpose open",
      "scores": [
        62.6,
        86.4,
        62.66,
        54.15,
        61.81,
        74.83,
        35.8,
        62.61,
        92.02
      ]
    },
    {
      "name": "Qwen3.5-9B",
      "group": "General-purpose open",
      "scores": [
        72.0,
        90.35,
        53.46,
        57.76,
        68.33,
        78.65,
        39.47,
        65.72,
        86.7
      ]
    },
    {
      "name": "RynnBrain-8B",
      "group": "Open embodied",
      "scores": [
        68.0,
        11.7,
        70.0,
        56.68,
        65.58,
        79.29,
        15.5,
        52.39,
        80.14
      ]
    },
    {
      "name": "RoboBrain 2.5-8B",
      "group": "Open embodied",
      "scores": [
        64.0,
        78.8,
        63.71,
        59.21,
        59.27,
        76.33,
        56.24,
        65.37,
        81.35
      ]
    },
    {
      "name": "ACE-Brain-0.5-8B",
      "group": "Open embodied",
      "scores": [
        70.7,
        85.4,
        58.3,
        53.43,
        68.02,
        75.37,
        34.38,
        63.66,
        66.91
      ]
    },
    {
      "name": "Embodied-R1.5-8B",
      "group": "Open embodied",
      "scores": [
        77.0,
        81.7,
        68.96,
        57.04,
        71.38,
        83.43,
        37.21,
        68.1,
        75.24
      ]
    },
    {
      "name": "SenseNova-SI-1.1-8B",
      "group": "Open embodied",
      "scores": [
        47.0,
        59.2,
        59.65,
        29.78,
        51.83,
        50.71,
        25.98,
        46.31,
        66.83
      ]
    },
    {
      "name": "PhysBrain 1.5-8B",
      "group": "Open embodied",
      "scores": [
        76.3,
        85.63,
        69.74,
        55.6,
        69.86,
        81.24,
        33.47,
        67.41,
        87.05
      ]
    },
    {
      "name": "ACE-Brain-0.6",
      "group": "Ours",
      "scores": [
        81.44,
        86.96,
        76.56,
        71.84,
        74.13,
        88.14,
        48.82,
        75.41,
        93.42
      ]
    }
  ],
  "examples": [
    {
      "id": "ref_point",
      "title": "Referring point",
      "group": "Referring",
      "question": "Show me the pepsi drink with a point.",
      "images": [
        "assets/examples/ref_point-1.jpg"
      ],
      "answer": {
        "boxes": [
          [
            357,
            494,
            420,
            628
          ]
        ]
      },
      "contextBoxes": []
    },
    {
      "id": "ref_box",
      "title": "Bounding box",
      "group": "Referring",
      "question": "Draw a bounding box around the toilet paper roll.",
      "images": [
        "assets/examples/ref_box-1.jpg"
      ],
      "answer": {
        "boxes": [
          [
            326,
            228,
            551,
            556
          ]
        ]
      },
      "contextBoxes": []
    },
    {
      "id": "attribute_point",
      "title": "Attribute",
      "group": "Referring",
      "question": "Where is the chocolate cookie? Point to it.",
      "images": [
        "assets/examples/attribute_point-1.jpg"
      ],
      "answer": {
        "boxes": [
          [
            712,
            730,
            817,
            839
          ]
        ]
      },
      "contextBoxes": []
    },
    {
      "id": "ordinal_point",
      "title": "Ordinal position",
      "group": "Referring",
      "question": "Point to the bottommost shoe.",
      "images": [
        "assets/examples/ordinal_point-1.jpg"
      ],
      "answer": {
        "boxes": [
          [
            699,
            502,
            975,
            600
          ]
        ]
      },
      "contextBoxes": []
    },
    {
      "id": "relation_point",
      "title": "Spatial relation",
      "group": "Referring",
      "question": "Point to the blue bin to the left of the pencil.",
      "images": [
        "assets/examples/relation_point-1.jpg"
      ],
      "answer": {
        "boxes": [
          [
            112,
            167,
            270,
            286
          ]
        ]
      },
      "contextBoxes": []
    },
    {
      "id": "small_point",
      "title": "Small object",
      "group": "Referring",
      "question": "Where is the yellow plastic part? Point to it.",
      "images": [
        "assets/examples/small_point-1.jpg"
      ],
      "answer": {
        "boxes": [
          [
            523,
            525,
            588,
            615
          ]
        ]
      },
      "contextBoxes": []
    },
    {
      "id": "task_target",
      "title": "Task target",
      "group": "Task grounding",
      "question": "Task: \"Hang the mug on the cup rack.\" Which object should the robot act on? Point to it.",
      "images": [
        "assets/examples/task_target-1.jpg"
      ],
      "answer": {
        "boxes": [
          [
            723,
            230,
            868,
            386
          ]
        ]
      },
      "contextBoxes": []
    },
    {
      "id": "task_receptacle",
      "title": "Task destination",
      "group": "Task grounding",
      "question": "For the task \"Pick snacks from the snack shelf and place them into the snack-purchase bin.\", which place is the destination? Point to it.",
      "images": [
        "assets/examples/task_receptacle-1.jpg"
      ],
      "answer": {
        "boxes": [
          [
            322,
            615,
            671,
            783
          ]
        ]
      },
      "contextBoxes": []
    },
    {
      "id": "multi_point",
      "title": "Every instance",
      "group": "Multi-instance",
      "question": "Point to every soda can in the image.",
      "images": [
        "assets/examples/multi_point-1.jpg"
      ],
      "answer": {
        "boxes": [
          [
            350,
            228,
            449,
            388
          ],
          [
            263,
            230,
            375,
            388
          ],
          [
            275,
            152,
            368,
            261
          ]
        ],
        "count": 3
      },
      "contextBoxes": []
    },
    {
      "id": "count_number",
      "title": "Counting",
      "group": "Multi-instance",
      "question": "Count the basket handles in the image. Answer with a number only.",
      "images": [
        "assets/examples/count_number-1.jpg"
      ],
      "answer": {
        "count": 2,
        "boxes": [
          [
            49,
            286,
            283,
            489
          ],
          [
            442,
            368,
            676,
            739
          ]
        ]
      },
      "contextBoxes": []
    },
    {
      "id": "existence",
      "title": "Absent object",
      "group": "Absence & judgment",
      "question": "Is there a mop in the image? If so, point to it; if not, answer \"none\".",
      "images": [
        "assets/examples/existence-1.jpg"
      ],
      "answer": {
        "exists": false,
        "boxes": []
      },
      "contextBoxes": []
    },
    {
      "id": "attr_existence",
      "title": "Absent attribute",
      "group": "Absence & judgment",
      "question": "Point to the red box in the image. If there is no red box in the image, answer \"none\".",
      "images": [
        "assets/examples/attr_existence-1.jpg"
      ],
      "answer": {
        "exists": false,
        "boxes": []
      },
      "contextBoxes": []
    },
    {
      "id": "spatial_yn",
      "title": "Spatial yes/no",
      "group": "Absence & judgment",
      "question": "In the image, is the plate to the left of the toaster? Answer yes or no.",
      "images": [
        "assets/examples/spatial_yn-1.jpg"
      ],
      "answer": {
        "yn": "yes"
      },
      "contextBoxes": [
        [
          31,
          426,
          317,
          658
        ],
        [
          725,
          212,
          1000,
          634
        ]
      ]
    },
    {
      "id": "cross_view",
      "title": "Cross-view correspondence",
      "group": "Cross-view",
      "question": "The red box in image 1 marks an object. Image 2 is another camera view of the same scene at the same time. Where is that object in image 2? Point to it.",
      "images": [
        "assets/examples/cross_view-1.jpg",
        "assets/examples/cross_view-2.jpg"
      ],
      "answer": {
        "boxes": [
          [
            453,
            350,
            605,
            551
          ]
        ]
      },
      "contextBoxes": []
    }
  ]
};
