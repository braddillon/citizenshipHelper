import React from "react";
import Checkbox from "@material-ui/core/Checkbox";
import InputLabel from '@material-ui/core/InputLabel';

const renderCheckbox = ({ input, label }) => (
  <div>
  <InputLabel htmlFor={input.name} style={{marginRight: 10}}>{label}</InputLabel>
  <Checkbox label={label} checked={input.value ? true : false} onChange={input.onChange} />
  </div>
);

export default renderCheckbox;
