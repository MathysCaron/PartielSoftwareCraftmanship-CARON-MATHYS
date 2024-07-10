/* 4. Aie aie aie, l’équipe a reçu un nouveau  cket mé er pour notre ges on des achats durant vos congés, évidemment, ils ont du chiffrer tout ça et réduire le temps ini alement demandé. Vous rentrez donc de congés et voyez un  cket :

Code review :

- Le problème de la fonction est que la méthode processorder fait trop de chose, les fonctions doivent de base faire une chose et la fait bien. il y a une vérification + un enregistrement + envoie de mail + mise a jour de l'inventaire. la meilleure des choses à faire et de faire des méthodes distinctes pour chaque choses.

- La gestion des erreurs n'est pas faite aussi, ça serait bien d'en ajouter une afin d'améliorer le traitement des erreurs.

*/ 

public class OrderProcessor {
    private Database database;
    private EmailService emailService;
    private InventorySystem inventorySystem;

    public OrderProcessor(Database database, EmailService emailService, InventorySystem inventorySystem) {
        this.database = database;
        this.emailService = emailService;
        this.inventorySystem = inventorySystem;
    }

    public void processOrder(Order order) {
        checkInventory(order);
        saveOrder(order);
        confirmationEmail(order);
        updateInventory(order);
        applyRemise(order);
    }

    private void checkInventory(Order order) {
        for (Item item : order.getItems()) {
            if (!inventorySystem.isItemAvailable(item)) {
                throw new RuntimeException("Item not available in inventory");
            }
        }
    }

    private void saveOrder(Order order) {
        database.saveOrder(order);
    }

    private void confirmationEmail(Order order) {
        String message = "Votre commande a bien été reçu !";
        emailService.sendEmail(order.getCustomerEmail(), "Confirmation de la commande", message);
    }

    private void updateInventory(Order order) {
        for (Item item : order.getItems()) {
            inventorySystem.updateInventory(item, item.getQuantity() * -1);
        }
    }

    private void applyRemise(Order order) {
        if (order instanceof LoyalCustomerOrder) {
            ((LoyalCustomerOrder) order).applyRemise();
        }
    }
}

public class LoyalCustomerOrder extends Order {
    @Override
    public void applyRemise() {
        // Appliquer une remise de 10%
        setTotalPrice(getTotalPrice() * 0.9);
    }
}
