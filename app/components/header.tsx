"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import FormModal from "@/app/components/beam-form-modal";
import FramesFormModal from "./frames-form-modal";

export default function Header() {
  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed w-full z-50 bg-white/10 backdrop-blur-md border-b border-white/20"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center space-x-2"
          >
            <span className="text-2xl font-bold text-white">⚡ BeamCalc</span>
          </motion.div>

          <nav>
            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex space-x-8"
            >
              <li>
                <FormModal />
              </li>
              <li>
                <FramesFormModal />
              </li>
            </motion.ul>
          </nav>
        </div>
      </div>
    </motion.header>
  );
}
