import { motion } from "framer-motion";

export type Table_Animation_Props = {
  children: React.ReactNode;
};

export const Table_Animation = ({ children }: Table_Animation_Props) => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    </>
  );
};
