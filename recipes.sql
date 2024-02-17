-- categories table
CREATE TABLE categories (
    category_id INT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

-- ingredients table
CREATE TABLE ingredients (
    ingredient_id INT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

-- recipes table
CREATE TABLE recipes (
    recipe_id INT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category_id INT,
    instructions TEXT,
    FOREIGN KEY (category_id) REFERENCES categories(category_id)
);

-- recipe ingredients table (many-to-many relations)
CREATE TABLE recipe_ingredients (
    recipe_id INT,
    ingredient_id INT,
    FOREIGN KEY (recipe_id) REFERENCES recipes(recipe_id),
    FOREIGN KEY (ingredient_id) REFERENCES ingredients(ingredient_id),
    PRIMARY KEY (recipe_id, ingredient_id)
);

-- cooking steps table
CREATE TABLE cooking_steps (
    step_id INT PRIMARY KEY,
    recipe_id INT,
    step_number INT,
    description TEXT,
    FOREIGN KEY (recipe_id) REFERENCES recipes(recipe_id)
);
