const Details = [
  {
    name: "source",
    errorMessage: "Please enter a valid source.",
    errorParams: {
      required: "source is required.",
      pattern: {
        value: /^[a-zA-Z0-9]+$/,
        message: "Source must have an alphanumeric value.",
      },
    },
  },
  {
    name: "target",
    errorMessage: "Please enter a valid target.",
    errorParams: {
      required: "target is required.",
      pattern: {
        value: /^[a-zA-Z0-9]+$/,
        message: "Target must have an alphanumeric value.",
      },
    },
  },
  {
    name: "positionX",
    errorMessage: "Please enter a valid x.",
    errorParams: {
      required: "x is required.",
      pattern: { value: /^\d+$/, message: "x must be numeric." },
    },
  },
  {
    name: "positionY",
    errorMessage: "Please enter a valid y.",
    errorParams: {
      required: "y is required.",
      pattern: { value: /^\d+$/, message: "y must be numeric." },
    },
  },
  {
    name: "label",
    errorMessage: "Please enter a valid label.",
    errorParams: {
      required: "label is required.",
      pattern: { value: /^[a-zA-Z]+$/g, message: "label must be alphabets." },
    },
  },
];

export { Details };
