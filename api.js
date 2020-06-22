//https://app.swaggerhub.com/apis/g1858/task2020/1.0.0-oas3#free
/**
 * @swagger
 * /:
 *  get:
 *      responses:
 *          '401':
 *              description: cookies not found
 *          '200':
 *              description: nice
 * /login:
 *  get:
 *      responses:
 *          '400':
 *          '401':
 *          '200':
 *              description: u in system
 *  post:
 *      description:
 *      responses:
 *          '200':
 *              description:
 *          '400':
 *              description: login or password undefined
 * /signup:
 *  get:
 *      responses:
 *          '400':
 *              description: error
 *          '401':
 *              description: non auth
 *          '200':
 *              description: ok
 *  post:
 *      responses:
 *          '400':
 *              description: error
 *          '401':
 *              description: non auth
 *          '200':
 *              description: ok
 * /logout:
 *  get:
 *      responses:
 *          '400':
 *              description: error
 *          '401':
 *              description: non auth
 *          '200':
 *              description: ok
 * /task/get:
 *  get:
 *      responses:
 *          '400':
 *              description: error
 *          '401':
 *              description: non auth
 *          '200':
 *              description: ok
 *  post:
 *      responses:
 *          '400':
 *              description: error
 *          '401':
 *              description: non auth
 *          '200':
 *              description: ok
 * /task/add:
 *  get:
 *      responses:
 *          '400':
 *              description: error
 *          '401':
 *              description: non auth
 *          '200':
 *              description: ok
 *  post:
 *      responses:
 *          '400':
 *              description: error
 *          '401':
 *              description: non auth
 *          '200':
 *              description: ok
 *
 * /task/change:
 *  get:
 *      responses:
 *          '400':
 *              description: error
 *          '401':
 *              description: non auth
 *          '200':
 *              description: ok
 *  post:
 *      responses:
 *          '400':
 *              description: error
 *          '401':
 *              description: non auth
 *          '200':
 *              description: ok
 * /task/edit:
 *  get:
 *      responses:
 *          '400':
 *              description: error
 *          '401':
 *              description: non auth
 *          '200':
 *              description: ok
 *  post:
 *      responses:
 *          '400':
 *              description: error
 *          '401':
 *              description: non auth
 *          '200':
 *              description: ok
 * /task/getInfo:
 *  get:
 *      responses:
 *          '400':
 *              description: error
 *          '401':
 *              description: non auth
 *          '200':
 *              description: ok
 * /task/addSubtask:
 *  post:
 *      responses:
 *          '400':
 *              description: error
 *          '401':
 *              description: non auth
 *          '200':
 *              description: ok
 * */