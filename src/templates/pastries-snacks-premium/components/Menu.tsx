import React from "react";
import { useTemplateData } from "../TemplateContext";
import { motion } from "framer-motion";

export default function Menu() {
  const { products } = useTemplateData();

  return (
    <section className="gf-menu" id="menu">
      <div className="gf-wrap">
        <div className="gf-menu-head">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <span>Counter list</span>
            <h2>{products.title}</h2>
            <p>{products.description}</p>
          </motion.div>
        </div>

        <div className="gf-product-shelf">
          {products.items.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="gf-product"
            >
              <div className="gf-product-image">
                <img
                  src={item.image}
                  alt={item.imageAlt}
                />
              </div>
              
              <div className="gf-product-row">
                <h3>{item.name}</h3>
                <span>{item.price}</span>
              </div>
              <p>{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
