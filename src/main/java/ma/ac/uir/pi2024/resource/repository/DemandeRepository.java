package ma.ac.uir.pi2024.resource.repository;



import ma.ac.uir.pi2024.resource.entity.Demande;
import org.hibernate.*;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.hibernate.Session;
import org.hibernate.SessionFactory;

import java.util.List;


@Repository
public class DemandeRepository implements DemandeRepositoryInterface {


    private SessionFactory factory;

    @Override
    public void addDemande(Demande demande) {
        Session session = factory.getCurrentSession();
        session.saveOrUpdate(demande);
    }

    @Override
    public Demande getDemande(int id) {
        Session session = factory.getCurrentSession();
        return session.get(Demande.class, id);
    }
    public List<Demande> getDemandes(int sortBy) {
        String sort;
        switch (sortBy) {
            case 0: sort = "firstName";
                break;
            case 2: sort = "email";
                break;
            default:
                sort = "lastName";
        }
        Session session = factory.getCurrentSession(); // get hibernate session.
        String queryString = "from Demande order by " + sort;
        Query<Demande> query = session.createQuery(queryString, Demande.class); // create query.
        return query.getResultList(); // execute query and get customers list.
    }

    @Override
    public void deleteDemande(int id) {
        Session session = factory.getCurrentSession(); // get hibernate session.
        Query query = session.createQuery("delete from Demande where id=:customerID");
        query.setParameter("customerID", id);
        query.executeUpdate(); // delete the customer from the database.
    }

    @Override
    public List<Demande> searchDemande(String searchString) {
        Session session = factory.getCurrentSession();
        Query<Demande> query = session.createQuery("from Demande where numDemande like :search ", Demande.class);
        searchString = "%" + searchString + "%";
        query.setParameter("search", searchString);
        return query.getResultList();
    }


    @Autowired
    public void setFactory(SessionFactory factory) {
        this.factory = factory;
    }
}