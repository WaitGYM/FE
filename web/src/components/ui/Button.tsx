import { Button as MuiButton } from "@mui/material";

type ButtonProps = {
  title: string;
  color: "primary" | "secondary";
};

export default function Button({ title, color }: ButtonProps) {
  return (
    <>
      <MuiButton variant="contained" color={color}>
        {title}
      </MuiButton>
    </>
  );
}
